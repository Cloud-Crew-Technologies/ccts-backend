import {
    Taskcreate,
    getbyIDTask,
    updateByID
} from "../controller/taskcontoller.js";
import e from "express";

const router = e.Router();

router.route("/create").post(Taskcreate);
router.route("/:idfortask").get(getbyIDTask);
router.route("/:_id").put(updateByID);

export default router;