import {
    Taskcreate,
    getbyIDTask,
    updateByID,
    getall
} from "../controller/taskcontoller.js";

import{
    Pendingcreate,
    getbyIDPendingTask,
    Pendingupdateid,
    Pendinggetall
} from "../controller/pendingcontroller.js";

import{
    completedcreate,
    getbyIDcompletedTask,
    completedupdateid
} from "../controller/completedcontroller.js";

import{
    AssignedTaskcreate,
    assignedgetbyIDTask
} from "../controller/assigned_task_controller.js";
import{
    RejectedTaskcreate,
    RejectedgetbyIDTask
} from "../controller/rejected_task_controller.js";

import e from "express";

const router = e.Router();


router.route("/create").post(Taskcreate);
router.route("/all").get(getall);
router.route("/:idfortask").get(getbyIDTask);
router.route("/:_id").put(updateByID);

router.route("/pending/create").post(Pendingcreate);
router.route("/pending/getall").get(Pendinggetall);
router.route("/pending/:idfortask").get(getbyIDPendingTask);
router.route("/pending/:_id").put(Pendingupdateid);

router.route("/completed/create").post(completedcreate);
router.route("/completed/:idfortask").get(getbyIDcompletedTask);
router.route("/completed/:_id").put(completedupdateid);

//assigned_tasks section

router.route("/assigned").post(AssignedTaskcreate);
router.route("/assigned/:idfortask").get(assignedgetbyIDTask);

//rejected_tasks section

router.route("/rejected").post(RejectedTaskcreate);
router.route("/rejected/:idfortask").get(RejectedgetbyIDTask);

export default router;