import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import login from "./Routes/loginroute.js";
import user from "./Routes/userroute.js";
import Rejected from "./Routes/Rejectedroute.js";
import task from "./Routes/taskroute.js";

dotenv.config({ path: `.env` });

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const DB_URL = process.env.DATABASE_URI;

const connectDatabase = (uri) => {
  try {
    mongoose
      .connect(uri)
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      })
      .catch((err) => {
        console.log("MongoDB Error", err);
      });
  } catch (err) {
    console.log("MongoDB Error", err);
  }
};

connectDatabase(DB_URL);

app.use("/api", login);
app.use("/user", user);
app.use("/rejected", Rejected);
app.use("/task", task);

const port = process.env.PORT || 3004;
const server = app.listen(port, () => {
  console.log(
    "Cloud Crew Technologies API " +
      process.env.NODE_ENV +
      " mode on PORT " +
      process.env.PORT +
      " " +
      new Date()
  );
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
