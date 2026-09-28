import type QRCodeType from 'qrcode';

export const generateQR = async (text: string | QRCodeType.QRCodeSegment[]) => {
  try {
    const QRCode = (await import('qrcode')).default || await import('qrcode');
    return await QRCode.toDataURL(text, {
      margin: 1,
      width: 1024
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate QR Code");
  }
}
