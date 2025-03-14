import e from "express";
import {
  loginuser,
  signuser,
  resumeUpload,
  getUserResume,
} from "../controller/logincontroller.js";

const router = e.Router();

router.route("/login").post(loginuser);

router.route("/signup").post(signuser);

router.route("/getresume").get(getUserResume);

export default router;
