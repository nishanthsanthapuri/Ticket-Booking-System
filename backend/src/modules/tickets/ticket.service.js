const Ticket = require("./ticket.model");

const createTicketType = async (ticketData) => {
  return Ticket.create(ticketData);
};

const getTicketsByEvent = async (eventId) => {
  return Ticket.find({ eventId });
};

module.exports = {
  createTicketType,
  getTicketsByEvent,
};
