const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.sendgridAPIKey);

const sendContactEmail = async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  sgMail.send({
    to: email,
    from: "missbeautyspa.4u@gmail.com",
    subject: "Hello from Miss Beauty Spa",
    text: `***PLEASE DO NOT REPLY TO THIS EMAIL*** Hello ${name}! Thank you for sending us a message. We will get back to you the soonest. Regards, Miss Beauty Spa Team.`,
  });

  sgMail.send({
    to: "missbeautyspa.4u@gmail.com", //MISS BEAUTY SPA EMAIL
    from: email,
    subject: `Hello, you have a new contact message from ${name}`,
    text: `Hello! You have received the following message from ${email} and phone ${phone}: ${message}`,
  });

  res.status(200).json({ message: "Your email was successfully sent." });
};

exports.sendContactEmail = sendContactEmail;
