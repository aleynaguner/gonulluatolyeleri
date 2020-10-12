const nodemailer = require("nodemailer");

const OUTLOOK_SERVICE = "outlook";
const GMAIL_SERVICE = "gmail";

const sendEmail = (senderAuth, service, receiver, subject, message) => {
  let result = {
    isSuccess: false,
    responseCode: 500,
    message: "",
  };

  var transporter = getTransporter(service, senderAuth);

  let mailOptions = {
    from: senderAuth.user,
    to: receiver,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      result.isSuccess = false;

      console.log(err);
    } else {
      result.isSuccess = true;

      console.log("Email sent: " + info.response);
    }

    result.message = info.response;
  });

  return result;
};

const getTransporter = (service, senderAuth) => {
  if (service == OUTLOOK_SERVICE) {
    return nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: senderAuth.user,
        pass: senderAuth.pass,
      },
    });
  } else if (service == GMAIL_SERVICE) {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: senderAuth.user,
        pass: senderAuth.pass,
      },
    });
  }
};

module.exports = { sendEmail };
