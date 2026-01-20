const QRCode = require("qrcode");

const generateQRCode = async (data) => {
  return QRCode.toDataURL(data);
};

module.exports = { generateQRCode };
