import QRCode, { type QRCodeSegment } from "qrcode";

export const generateQR = async (text: string | QRCodeSegment[]) => {
  try {
    return await QRCode.toDataURL(text, {
      margin: 1,
      width: 1024,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate QR Code");
  }
};
