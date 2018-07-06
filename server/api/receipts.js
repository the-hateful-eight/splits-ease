const router = require("express").Router();
const { Receipt } = require("../db");
const { createInvoice } = require("./paypal");

const twilio = require("twilio");
const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

const transporter = require("nodemailer").createTransport({
  service: "gmail",
  auth: {
    user: process.env.SPLITS_EASE_EMAIL_NAME,
    pass: process.env.SPLITS_EASE_EMAIL_PW
  }
});

<<<<<<< HEAD
module.exports = router;
=======
router.get(`/:id`, async (req, res, next) => {
  try{
    const receipts = await Receipt.findAll({where: { userId: req.params.id } })
    res.json(receipts)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  const buffer = Buffer.from(req.body.image, 'base64')
  try {
    const parsed = await client.documentTextDetection(buffer)
    res.json(parsed[0])
    // const createdReceipt = Receipt.create({receiptImage: buffer, userId: req.params.id})
  } catch (err) {
    console.error(err)
    next()
  }
})
>>>>>>> 400758f868aee3c96844b32058e9e17d7d9def51

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
        if (req.body.code) {
          createInvoice(req.body.code, list, friend);
        } else {
          transporter.sendMail(
            {
              from: process.env.SPLITS_EASE_EMAIL_NAME,
              to: friend.email,
              subject: "Splits-ease receipt",
              html: message
            },
            (err, info) => {
              console.log(err ? err : info);
            }
          );
        }
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

router.get("/", async (req, res, next) => {
  try {
    const receipts = await Receipt.findAll();
    res.json(receipts);
  } catch (err) {
    next(err);
  }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    const receipts = await Receipt.findAll({
      where: { userId: req.params.id }
    });
    res.json(receipts);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  const buffer = Buffer.from(req.body.image, "base64");
  try {
    const parsed = await client.documentTextDetection(buffer);
    res.json(parsed[0]);
    const createdReceipt = Receipt.create({
      receiptImage: buffer,
      userId: req.params.id
    });
  } catch (err) {
    console.error(err);
    next();
  }
});
