const { createTicketType, getTicketsByEvent } = require("./ticket.service");

const createTicketHandler = async (req, res, next) => {
  try {
    const ticket = await createTicketType({
      ...req.body,
      eventId: req.params.eventId,
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
};

const getTicketsHandler = async (req, res, next) => {
  try {
    const tickets = await getTicketsByEvent(req.params.eventId);

    res.json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTicketHandler,
  getTicketsHandler,
};
