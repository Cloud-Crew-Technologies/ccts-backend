import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const RejectedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // the hashed password is now here
    type: String,
    required: true,
  },
  // hash: String, // Don't need a separate hash field anymore
  salt: String,
  domain: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pancard: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  yearofstudying: {
    type: Number,
    required: true,
  },
  yearofpassing: {
    type: Number,
    required: true,
  },
  github: {
    type: String,
    required: true,
    unique: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  uniqueid: {
    type: Number,
    unique: true,
    required: true,
  },
});

RejectedSchema.methods.setPassword = function (password) {
  // Use crypto.randomBytes(16).toString("hex")
  // pbkdf2Sync(password, this.salt, 1000, 64, `sha512`) 
  this.password = password;
  this.salt = crypto.randomBytes(16).toString("hex");

  console.log("Storing pre-hashed password");
};

RejectedSchema.methods.validPassword = function (password) {
  console.log("validPassword called with password:", password);

  console.log("Comparing against stored password:", this.password);
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
    console.log("password after entering",hash);

  return this.password === hash;
};

RejectedSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  );
};

const Rejected = mongoose.model("Rejected", RejectedSchema);
export default Rejected;
