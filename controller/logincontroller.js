import {
  loginUserService,
  signUserServices,
} from "../services/loginservices.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import multer from "multer";
import fileUpload from "express-fileupload";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

export const resumeUpload = fileUpload({
  limits: { fileSize: 3 * 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: "File size limit reached",
  useTempFiles: true,
  tempFileDir: "/tmp/",
});

export const signuser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        message: "No files were uploaded.",
      });
    }

    const resumeFile = req.files.resume;

    if (!resumeFile) {
      return res.status(400).send({
        message: "No resume file uploaded.",
      });
    }

    const userData = req.body;
    const user = await signUserServices(userData, resumeFile);

    return res.status(201).send({
      message: "User added successfully.",
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: "Failed to add user.",
      error: error.message,
    });
  }
};

export const loginuser = async (req, res, next) => {
  const {email, password } = req.body;

  try {
    const user = await loginUserService(email,password);

    if (!user) {
      return next(new Error("Email or password is incorrect"));
    }

    return res.status(200).send({
      message: "User Logged In",
    });
  } catch (error) {
    console.error(error);
    return next(new Error("Something went wrong"));
  }
};

export const getUserResume = async (req, res) => {
  try {
    const userId = req.params.userId;
    const resume = await getUserResumeService(userId);

    res.setHeader("Content-Type", resume.contentType);
    res.setHeader("Content-Disposition", 'inline; filename="resume.pdf"');

    res.send(resume.data);
  } catch (error) {
    console.error(error);
    res.status(404).send({
      message: "Resume not found",
      error: error.message,
    });
  }
};
