import {
    Taskcreate,
    getbyIDTask
} from "../controller/taskcontoller.js";
import { AssignedTaskcreate,assignedgetbyIDTask } from "../controller/assigned_task_controller.js";
import { RejectedTaskcreate,RejectedgetbyIDTask } from "../controller/rejected_task_controller.js";

import e from "express";

const router = e.Router();

router.route("/create").post(Taskcreate);
router.route("/:idfortask").get(getbyIDTask);

//assigned_tasks section

router.route("/assigned").post(AssignedTaskcreate);
router.route("/assigned/:idfortask").get(assignedgetbyIDTask);

//rejected_tasks section

router.route("/rejected").post(RejectedTaskcreate);
router.route("/rejected/:idfortask").get(RejectedgetbyIDTask);

export default router;