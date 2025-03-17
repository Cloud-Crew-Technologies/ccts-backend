import e from "express";
import {
  loginuser,
  signuser,
  getUserResume,
  getUserbyID
} from "../controller/logincontroller.js";
import { authMiddleware } from "../controller/auth.js";

const router = e.Router();

router.route("/login").post(loginuser);

router.route("/signup").post(signuser);

// router.route("/getresume").get(getUserResume);

router.route("/:uniqueid").get(authMiddleware,getUserbyID);

export default router;
