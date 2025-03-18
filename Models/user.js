import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const UsersSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  hash: String, // Store the pre-hashed password here
  salt: String, //  Store the salt here.
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

// You *don't* hash here, since the password is already hashed
UsersSchema.methods.setPassword = function (password) {
  console.log("setPassword called with password (but not hashing):", password);
  this.salt = password; // Just store the hashed value
  console.log("Storing password");
};

UsersSchema.methods.validPassword = function (password) {
  console.log("validPassword called with password:", password);
  //console.log("Salt:", this.salt); // No salt required

  console.log("Comparing to stored hash:", this.hash);
  return this.hash === password; // DIRECT COMPARISON against stored hash
};

UsersSchema.methods.generateJWT = function () {
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

const Users = mongoose.model("User", UsersSchema);
export default Users;
