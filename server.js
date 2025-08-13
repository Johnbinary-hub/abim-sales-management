// server.js
// Run this on a machine that has access to the ESC/POS USB printer.
// npm install express body-parser cors escpos escpos-usb

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/print', (req, res) => {
  const { items = [], total = 0, date = '' } = req.body;
  try {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);
    device.open(() => {
      printer
        .align('CT')
        .style('B')
        .size(1, 1)
        .text('AbimBest Store')
        .text('---------------------------')
        .style('NORMAL')
        .align('LT')
        .text('Date: ' + date);
      items.forEach(it => {
        printer.text(`${it.name} x${it.qty || 1}  ₦${(it.price*(it.qty||1)).toFixed(2)}`);
      });
      printer.text('---------------------------')
        .text('Total: ₦' + Number(total).toFixed(2))
        .align('CT')
        .text('Thank you!')
        .cut()
        .close();
      // reply immediately (printer prints asynchronously)
      res.json({ status: 'printed' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Printer service on http://localhost:3000'));
