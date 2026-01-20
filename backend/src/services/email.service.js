const nodemailer = require("nodemailer");

let transporterPromise = nodemailer.createTestAccount().then((testAccount) => {
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
});

const sendBookingConfirmationEmail = async ({
  to,
  eventTitle,
  bookingId,
  ticketUrl,
}) => {
  const transporter = await transporterPromise;

  const info = await transporter.sendMail({
    from: '"Ticket Platform" <no-reply@tickets.com>',
    to,
    subject: "🎟️ Booking Confirmed",
    html: `
      <h2>Booking Confirmed</h2>
      <p><strong>Event:</strong> ${eventTitle}</p>
      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p>
        <a href="${ticketUrl}">
          👉 View Your Ticket (QR)
        </a>
      </p>
      <p>Show this QR at the venue.</p>
    `,
  });

  console.log("📧 Email Preview URL:", nodemailer.getTestMessageUrl(info));
};

module.exports = { sendBookingConfirmationEmail };
