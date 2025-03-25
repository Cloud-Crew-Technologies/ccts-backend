import e from "express";
import {
    userlogin,
    usersign,
    getUserbyID,
    getAll,
    updateUser,
} from "../controller/usercontroller.js";
import { authMiddleware } from "../controller/auth.js";

const router = e.Router();

router.route("/login").post(userlogin);

router.route("/loadup").post(usersign);
router.route("/all").get(getAll);
// router.route("/getresume").get(getUserResume);

router.route("/update/:uniqueid").put(updateUser);

router.route("/:uniqueid").get(getUserbyID);

export default router;
