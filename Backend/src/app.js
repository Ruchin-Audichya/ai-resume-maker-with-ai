import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = (process.env.ALLOWED_SITE || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser requests and same-origin requests without an Origin header.
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.get("/api/health", (_req, res) => {
    res.status(200).json({ ok: true, message: "Backend is running" });
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;
