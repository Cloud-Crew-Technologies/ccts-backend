import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  password: { type: String, required: true }, // Ensure this is defined
  hash: String,
  salt: String,
  personalInfo: { type: String },
  mobileNumber: { type: Number, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  projectName: { type: String },
  projectDescription: { type: String },
  projectMembers: { type: Number },
});

profileSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  this.password = this.hash;
};

profileSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

profileSchema.methods.generateJWT = function () {
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

const profile = mongoose.model("Profile", profileSchema);
export default profile;
