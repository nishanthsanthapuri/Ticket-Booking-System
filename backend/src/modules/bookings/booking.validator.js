const validateCreateBooking = ({ eventId, ticketId, quantity }) => {
  if (!eventId || !ticketId || !quantity) {
    throw new Error("Missing booking fields");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }
};

module.exports = { validateCreateBooking };
