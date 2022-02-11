const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
require("dotenv").config();
admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "louiestokk@gmail.com",
    pass: process.env.REACT_APP_GMAIL_PASSWORD,
  },
});
exports.sendEmail = functions.firestore
  .document("orders/{orderId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `order@zanzifood.com`,
      to: snap.data().email,
      subject: "contact form message",
      html: `<h1>Order Confirmation</h1>
                                <p>
                                   <b>Email: </b>${snap.data().email}<br>
                                </p>`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent!");
    });
  });
