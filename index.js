import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import adminRoute from "./routes/admin.route.js";
import webContentRoute from "./routes/webContent.route.js";   
import educationContentRoute from "./routes/educationContent.route.js";
import digitalContentRoute from "./routes/digitalContent.route.js";
import enquiryFormRoute from "./routes/enquiryForm.route.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Testing the server
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is up and running ...",
  });
});

// Api's
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/web-content", webContentRoute);
app.use("/api/v1/education-content", educationContentRoute);
app.use("/api/v1/digital-content", digitalContentRoute);
app.use("/api/v1/enquiry-form", enquiryFormRoute);

// Listening to the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
