import e from "express";
import {
  loginuser,
  signuser,
  getUserResume,
  getUserbyID,
  getAll
} from "../controller/logincontroller.js";
import { authMiddleware } from "../controller/auth.js";

const router = e.Router();

router.route("/login").post(loginuser);

router.route("/signup").post(signuser);
router.route("/all").get(getAll);
// router.route("/getresume").get(getUserResume);

router.route("/:uniqueid").get(getUserbyID);


export default router;
