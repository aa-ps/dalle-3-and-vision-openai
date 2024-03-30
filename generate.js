// Import the OpenAI default export from the 'openai' package.
import OpenAI from "openai";
// Import the writeFile function from the Node.js 'fs' (File System) module to handle file writing.
import { writeFile } from "fs";
// Import the cwebp function from the 'webp-converter' package to convert images to WebP format.
import { cwebp } from "webp-converter";
// Load the environment variables from a .env file into process.env
import "dotenv/config";

// Declare a constant for the text prompt, set to an empty string for now.
const PROMPT = "A dog eating a pancake";

// Initialize an instance of the OpenAI API client with your API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Read the API Key from environment variables for security reasons
});

// Use an asynchronous call to generate an image using OpenAI's DALL-E 3 model
const response = await openai.images.generate({
  model: "dall-e-3",          // Specifies which AI model to use
  prompt: PROMPT,             // Text prompt provided to the model
  n: 1,                       // Number of images to generate
  size: "1024x1024",          // Size of the generated image
  response_format: "b64_json", // The response format, base64 encoded JSON in this case
  quality: "hd",              // Quality parameter for the image
  style: "vivid",             // The style interpretation by the AI model
});

// Extract the base64-encoded image data from the response object
const imageBase64Data = response.data[0]["b64_json"];
// Convert the base64-encoded data into a buffer
const imageBufferData = Buffer.from(imageBase64Data, "base64");

// Generate a unique file name based on the current timestamp
const fileName = Date.now().toString();
// Construct the full file path for the new image file (PNG format)
const filePath = `${fileName}.png`;

// Write the image data to a file using the Node.js writeFile function
writeFile(filePath, imageBufferData, (err) => {
  if (err) {
    // Log an error message if there is an error saving the image
    console.error("Error saving the image file:", err);
  } else {
    // If no error, console log the raw response data (for debugging purposes)
    console.log(response.data);
  }
});

// Convert the saved PNG image to WebP format using the cwebp function
cwebp(filePath, `${filePath.replace(".png", ".webp")}`, "-q 100");
