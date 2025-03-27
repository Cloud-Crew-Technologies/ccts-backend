import {
    Taskcreate,
    getbyIDTask,
<<<<<<< HEAD
    updateByID
=======
    // updateByID
>>>>>>> 789ed20ee22834b021b00d269edbc34d33eba29c
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
<<<<<<< HEAD
router.route("/:_id").put(updateByID);
=======
// router.route("/:_id").put(updateByID);

router.route("/pending/create").post(Pendingcreate);
router.route("/pending/:idfortask").get(getbyIDPendingTask);
router.route("/pending/:_id").put(Pendingupdateid);

router.route("/pending/create").post(completedcreate);
router.route("/pending/:idfortask").get(getbyIDcompletedTask);
router.route("/pending/:_id").put(completedupdateid);
>>>>>>> 789ed20ee22834b021b00d269edbc34d33eba29c

export default router;