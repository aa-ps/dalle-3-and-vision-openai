// Import the OpenAI library from the 'openai' package
import OpenAI from "openai";
import 'dotenv/config'

// Initialize variables for image URL and prompt with empty strings
const IMG_URL = "";
const PROMPT = "";

// Create a new instance of the OpenAI API client with your API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // This reads the API Key from environment variables for security
});

// Asynchronous function call to get a response from the OpenAI API
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview", // Specifies which model to use, in this case GPT-4's vision model
  messages: [
    {
      role: "user", // Role specifies who is sending the message, here it's the user
      content: [
        {
          type: "text", // The content type, a text in this part
          text: PROMPT, // Text content passed to the model, value comes from the PROMPT variable
        },
        {
          type: "image_url", // The content type, an image URL in this part
          image_url: {
            url: IMG_URL, // Image URL to be processed by the model, value comes from the IMG_URL variable
            detail: "high", // Indicates that we want high detail from the analysis of the image
          },
        },
      ],
    },
  ],
  max_tokens: 300, // Maximum number of tokens (words) to generate in the completion
});

// Log the generated text.
console.log(response.choices[0]);
