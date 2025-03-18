import e from "express";
import {
    userlogin,
    usersign,
    getUserbyID,
    getAll
} from "../controller/usercontroller.js";
import { authMiddleware } from "../controller/auth.js";

const router = e.Router();

router.route("/login").post(userlogin);

router.route("/loadup").post(usersign);
router.route("/all").get(getAll);
// router.route("/getresume").get(getUserResume);

router.route("/:uniqueid").get(getUserbyID);

export default router;
