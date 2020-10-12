const nodemailer = require("nodemailer");

const OUTLOOK_SERVICE = "outlook";
const GMAIL_SERVICE = "gmail";

async function sendEmail(senderAuth, service, receiver, subject, message) {
  var transporter = getTransporter(service, senderAuth);

  let mailOptions = {
    from: senderAuth.user,
    to: receiver,
    subject: subject,
    text: message,
  };

  let emailerResponse = undefined;

  try {
    emailerResponse = await transporter.sendMail(mailOptions);

    return prepareSendEmailResult(true, emailerResponse);
  } catch (err) {
    return prepareSendEmailResult(false, err);
  }
}

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

const prepareSendEmailResult = (isSuccess, response) => {
  if (isSuccess) {
    console.log("Mail sending is successful!");

    return {
      isSuccess: true,
      responseCode: Number.parseInt(response.response.slice(0, 3)),
      message: response.response,
    };
  } else {
    console.log(`An error occurred while sending mail! : ${response}`);

    return {
      isSuccess: false,
      responseCode: response.responseCode,
      message: response.response,
    };
  }
};

module.exports = { sendEmail };
