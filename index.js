import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import login from "./Routes/loginroute.js";

dotenv.config({ path: `.env` });



const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

app.use(cors(corsOptions));

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
