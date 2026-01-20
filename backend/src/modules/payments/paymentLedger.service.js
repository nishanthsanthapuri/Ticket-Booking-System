const PaymentLedger = require("./paymentLedger.model");

/**
 * Append a new entry to the payment ledger
 * IMPORTANT: Ledger is append-only — never update existing rows
 */
const createLedgerEntry = async ({
  bookingId,
  orderId = null,
  paymentId = null,
  amount,
  status,
  metadata = {},
}) => {
  if (!bookingId || !amount || !status) {
    throw new Error("Missing required ledger fields");
  }

  return PaymentLedger.create({
    bookingId,
    orderId,
    paymentId,
    amount,
    status,
    metadata,
  });
};

/**
 * Fetch all ledger entries for a booking
 * Useful for admin, reconciliation, disputes
 */
const getLedgerByBooking = async (bookingId) => {
  return PaymentLedger.find({ bookingId }).sort({ createdAt: 1 });
};

module.exports = {
  createLedgerEntry,
  getLedgerByBooking,
};
