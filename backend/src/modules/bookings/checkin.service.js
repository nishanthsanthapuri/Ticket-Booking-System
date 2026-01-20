const Booking = require("./booking.model");

const checkInTicket = async ({ bookingId, ticketToken }) => {
  const booking = await Booking.findOneAndUpdate(
    {
      _id: bookingId,
      ticketToken,
      paymentStatus: "SUCCESS",
      checkedIn: false,
    },
    {
      checkedIn: true,
      checkedInAt: new Date(),
    },
    { new: true }
  );

  if (!booking) {
    throw new Error("Invalid or already used ticket");
  }

  return booking;
};

module.exports = { checkInTicket };
