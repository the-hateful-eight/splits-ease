const router = require("express").Router();
const { Receipt } = require("../db");
const fs = require("fs");
const {createInvoice } = require('./paypal')

const twilio = require("twilio");
const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

const transporter = require('nodemailer').createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SPLITS_EASE_EMAIL_NAME,
    pass: process.env.SPLITS_EASE_EMAIL_PW
  }
})

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const receipts = await Receipt.findAll();
    res.json(receipts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const buffer = Buffer.from(req.body.image, "base64");
  try {
    const parsed = await client.documentTextDetection(buffer);
    fs.writeFile("bk.txt", JSON.stringify(parsed[0]), "utf8", err =>
      console.error(err)
    );
    res.json(parsed[0]);
  } catch (err) {
    console.error(err);
    next();
  }
});

router.post("/send", (req, res, next) => {
  const items = req.body.items;
  console.log(req.body.code);
  let recipients = {};
  items.map(item => {
    if (item.belongsTo) {
      let recipient = JSON.stringify(item.belongsTo);
      recipients[recipient]
        ? recipients[recipient].push(item)
        : (recipients[recipient] = [item]);
    }
  });

  //testing
        // createInvoice(req.body.code, items, {
        //   email: 'mcontract27@gmail.com',
        //   phone: 9147870089,
        //   name: 'Matthew Contract'
        // })
  //testing

  console.log(recipients);
  try {
    Object.keys(recipients).map(recipient => {
      let friend = JSON.parse(recipient);
      let list = recipients[recipient];
      let total = list.reduce((acc, item) => acc + +item.price, 0);
      let message = "";
      list.forEach(item => {
        message += `${item.item}: ${item.price}\n`;
      });
      message += `Total: ${total}`;
      if (friend.email) {
        if (req.body.code) createInvoice(req.body.code, list, friend)
        transporter.sendMail({
          from: process.env.SPLITS_EASE_EMAIL_NAME,
          to: friend.email,
          subject: 'Splits-ease receipt',
          html: message
        }, (err, info) => {
          console.log(err ? err : info)
        })
      }
      if (friend.phone) {
        let number = friend.phone.replace(/\(\)-\s/g, "");
        if (!number.startsWith("+1")) number = "+1" + number;
        twilioClient.messages
          .create({
            body: message,
            to: number,
            from: process.env.TWILIO_SERVICE_SID
          })
          .then(messageRes => console.log(messageRes.sid));
      }
    });
    res.send();
  } catch (err) {
    console.error(err);
    next();
  }
});
