import {
    Taskcreate,
    getbyIDTask,
    updateByID
} from "../controller/taskcontoller.js";

import{
    Pendingcreate,
    getbyIDPendingTask,
    Pendingupdateid
} from "../controller/pendingcontroller.js";

import{
    completedcreate,
    getbyIDcompletedTask,
    completedupdateid
} from "../controller/completedcontroller.js";
import e from "express";

const router = e.Router();


router.route("/create").post(Taskcreate);
router.route("/:idfortask").get(getbyIDTask);
router.route("/:_id").put(updateByID);

router.route("/pending/create").post(Pendingcreate);
router.route("/pending/:idfortask").get(getbyIDPendingTask);
router.route("/pending/:_id").put(Pendingupdateid);

router.route("/pending/create").post(completedcreate);
router.route("/pending/:idfortask").get(getbyIDcompletedTask);
router.route("/pending/:_id").put(completedupdateid);

//assigned_tasks section

router.route("/assigned").post(AssignedTaskcreate);
router.route("/assigned/:idfortask").get(assignedgetbyIDTask);

//rejected_tasks section

router.route("/rejected").post(RejectedTaskcreate);
router.route("/rejected/:idfortask").get(RejectedgetbyIDTask);

export default router;