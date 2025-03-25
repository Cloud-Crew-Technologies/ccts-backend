import e from "express";
import {
    getRejectedAll,
    RejectedUserbyID,
    Rejectedsign,
    Rejectedlogin,
    Userdelete
} from "../controller/Rejectedcontroller.js";
import { authMiddleware } from "../controller/auth.js";

const router = e.Router();

router.route("/login").post(Rejectedlogin);

router.route("/loadup").post(Rejectedsign);
router.route("/all").get(getRejectedAll);
router.route("/delete/:uniqueid").delete(Userdelete);
// router.route("/getresume").get(getUserResume);

router.route("/:uniqueid").get(RejectedUserbyID);

export default router;
