import sharp from "sharp";
import Tesseract from "tesseract.js";

async function preprocessImage(imageBuffer) {
  // Convert the image to PNG format for best OCR results
  try {
    const processedImage = await sharp(imageBuffer)
      .toFormat("png")
      .grayscale()
      .resize(1000)
      .toBuffer();
    return processedImage;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function ExtractTextFromImage(imagePath) {
  try {
    console.log(imagePath);
    const imageBuffer = await sharp(imagePath).toBuffer(); // Read the image into a buffer
    const processedImage = await preprocessImage(imageBuffer);
    const result = await Tesseract.recognize(processedImage, {
      lang: "eng", // specify language to speed up
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", // restrict characters
      oem: Tesseract.OEM.LSTM_ONLY, // use a specific engine mode
    });
    console.log("result", result);
    return result.text;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default ExtractTextFromImage;
