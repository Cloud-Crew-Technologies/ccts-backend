// import mongoose from "mongoose";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";

// dotenv.config();

// const LoginSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   hash: String,
//   salt: String,
//   domain: {
//     type: String,
//     required: true,
//   },
//   mobileno: {
//     type: Number,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   pancard: {
//     type: String,
//     required: true,
//   },
//   dob: {
//     type: Date,
//     required: true,
//   },
//   skills: {
//     type: Array,
//     required: true,
//   },
//   college: {
//     type: String,
//     required: true,
//   },
//   degree: {
//     type: String,
//     required: true,
//   },
//   yearofstudying: {
//     type: Number,
//     required: true,
//   },
//   yearofpassing: {
//     type: Number,
//     required: true,
//   },
//   github: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   linkedin: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   // resume: {
//   //   fileId: mongoose.Schema.Types.ObjectId,
//   //   filename: String,
//   //   contentType: String,
//   //   uploadDate: {
//   //     type: Date,
//   //     default: Date.now,
//   //   },
//   //   size: Number,
//   // },
//   uniqueid: {
//     type: Number,
//     unique: true,
//     required: true,
//   },
// });

// LoginSchema.methods.setPassword = function (password) {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
//     .toString(`hex`);
// };

// LoginSchema.methods.validPassword = function (password) {
//   const hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
//     .toString(`hex`);
//   return this.hash === hash;
// };

// const Logins = mongoose.model("Login", LoginSchema);
// export default Logins;


import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const LoginSchema = new mongoose.Schema({
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
  hash: String,
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
    unique: true,
  },
  uniqueid: {
    type: Number,
    unique: true,
    required: true,
  },
});

LoginSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
    this.password = this.hash 
};

LoginSchema.methods.validPassword = function (password) {
  console.log("validPassword called with password:", password);
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

LoginSchema.methods.generateJWT = function () {
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

const Logins = mongoose.model("Login", LoginSchema);
export default Logins;
