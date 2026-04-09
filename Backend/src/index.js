import app from "./app.js";
import { connectDB } from "./db/index.js";
import { config } from "dotenv";
config();

const PORT = Number(process.env.PORT) || 5001;
const DB_RETRY_DELAY_MS = 5000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

const connectWithRetry = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("MongoDB connection failed. Retrying in 5s...", error?.message || error);
    setTimeout(connectWithRetry, DB_RETRY_DELAY_MS);
  }
};

connectWithRetry();
