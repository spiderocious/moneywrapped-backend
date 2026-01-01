export const aiConfig = {
  prompt: process.env.PROMPT || "default prompt",
  open_ai_api_key: process.env.OPEN_AI_API_KEY || "",
  model: "gpt-5-mini",
  useBase64Upload: process.env.USE_BASE64_UPLOAD === "true", // Toggle between base64 file upload vs text extraction
} as const;
