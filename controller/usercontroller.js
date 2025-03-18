import {
  UserloginService,
  UsersignServices,
  Userget,
  UsersgetAll,
} from "../services/userservics.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import multer from "multer";
import fileUpload from "express-fileupload";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 3 * 1024 * 1024,
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed"), false);
//     }
//   },
// });

// export const resumeUpload = fileUpload({
//   limits: { fileSize: 3 * 1024 * 1024 },
//   abortOnLimit: true,
//   responseOnLimit: "File size limit reached",
//   useTempFiles: true,
//   tempFileDir: "/tmp/",
// });

export const usersign = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files);

    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(BADREQUEST).send({
    //     message: "No files were uploaded.",
    //   });
    // }

    // const resumeFile = req.files.resume;

    // if (!resumeFile) {
    //   return res.status(BADREQUEST).send({
    //     message: "No resume file uploaded.",
    //   });
    // }

    const userData = req.body;
    const user = await UsersignServices(userData);

    return res.status(201).send({
      message: "User added successfully.",
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(BADREQUEST).send({
      message: "Failed to add user.",
      error: error.message,
    });
  }
};

export const userlogin = async (req, res, next) => {
  const { email, password } = req.body;
  
    try {
      const user = await UserloginService(email, password);
  
      if (!user) {
        return next("Email or password is incorrect", UNAUTHORIZED);
      }
      const token = user.generateJWT();
  
      return res.status(200).send({
        message: "User Logged In",
        token: token,
      });
    } catch (error) {
      console.error(error);
      return next("Something went wrong", SERVERERROR);
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
    res.status(NOTFOUND).send({
      message: "Resume not found",
      error: error.message,
    });
  }
};

export const getUserbyID = async (req, res, next) => {
  const { uniqueid } = req.params;
  if (uniqueid === null) {
    console.log("invalid request id is empty");
    return next("Unique ID is required", BADREQUEST);
  }
  const user = await Userget(uniqueid);
  if (user) {
    return res.status(SUCCESS).send(user);
  } else {
    return res.status(NOTFOUND).send({
      message: "User not found",
    });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const users = await UsersgetAll();
    return res.status(SUCCESS).send(users);
  } catch (error) {
    console.error(error);
    return next("Something went wrong", SERVERERROR);
  }
};
