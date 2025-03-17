import e from "express";
import {
  loginuser,
  signuser,
  resumeUpload,
  getUserResume,
  getUserbyID
} from "../controller/logincontroller.js";

const router = e.Router();

router.route("/login").post(loginuser);

router.route("/signup").post(signuser);

router.route("/getresume").get(getUserResume);

router.route("/:uniqueid").get(getUserbyID);

export default router;
