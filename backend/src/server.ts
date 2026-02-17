import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

// 1. Database Connection
// In serverless, we often connect at the top level or within the handler.
connectDB(); 

// 2. Conditional Listening
// Only run app.listen() if we are NOT on Vercel (local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Local Server running on http://localhost:${PORT}`);
  });
}

// 3. EXPORT the app (Required for Vercel)
export default app;