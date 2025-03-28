import {
    Taskcreate,
    getbyIDTask,
    updateByID,
    getall,
    getforidfortask
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
    completedupdateid,
    completedgetall
} from "../controller/completedcontroller.js";

import{
    AssignedTaskcreate,
    assignedgetbyIDTask,
    Asseignedgetall,
    AssignedTaskupdate 
} from "../controller/assigned_task_controller.js";
import{
    RejectedTaskcreate,
    RejectedgetbyIDTask,
    RejectedTaskupdateById,
    Rejectedgetall
} from "../controller/rejected_task_controller.js";

import e from "express";


const router = e.Router();

// task_section
router.route("/create").post(Taskcreate);
router.route("/all").get(getall);
router.route("/:_id").get(getbyIDTask);
router.route("/:_id").put(updateByID);
router.route("/check/:idfortask").get(getforidfortask);

// pending_tasks_section
router.route("/pending/create").post(Pendingcreate);
router.route("/pending/getall").get(Pendinggetall);
router.route("/pending/:idfortask").get(getbyIDPendingTask);
router.route("/pending/:_id").put(Pendingupdateid);

// completed_tasks_section
router.route("/completed/create").post(completedcreate);
router.route("/completed/getall").get(completedgetall);
router.route("/completed/:idfortask").get(getbyIDcompletedTask);
router.route("/completed/:_id").put(completedupdateid);

//assigned_tasks section
router.route("/assigned/all").get(Asseignedgetall);
router.route("/assigned").post(AssignedTaskcreate);
router.route("/assigned/:idfortask").get(assignedgetbyIDTask);
router.route("/assigned/:_id").put(AssignedTaskupdate);

//rejected_tasks section
router.route("/rejected/all").get(Rejectedgetall)
router.route("/rejected").post(RejectedTaskcreate);
router.route("/rejected/:idfortask").get(RejectedgetbyIDTask);
router.route("/rejected/:_id").put(RejectedTaskupdateById);

export default router;