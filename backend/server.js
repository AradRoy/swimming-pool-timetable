// Express init
import express from "express";
const app = express();

import fileUpload from "express-fileupload";
import cors from "cors";

import athletes from "./api/routes/athletes.route.js";
import timetable from "./api/routes/timetable.route.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// setup static
app.use(express.static("../frontend"));

// Routes
app.use("/api/athletes", athletes);
app.use("/api/timetable", timetable);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
