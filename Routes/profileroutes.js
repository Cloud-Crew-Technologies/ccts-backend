import {
  getAll,
  getUserbyID,
  newProfile,
  ProfileupdateById,
  loginprofile,
} from "../controller/profilecontroller.js";
import express from "express";

const router = express.Router();

router.route("/login").post(loginprofile);
router.route("/getallprofile").get(getAll);

router.route("/:name").get(getUserbyID);

router.route("/create").post(newProfile);

router.route("/:name").put(ProfileupdateById);


export default router;
