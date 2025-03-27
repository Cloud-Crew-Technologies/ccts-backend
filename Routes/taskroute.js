import {
    Taskcreate,
    getbyIDTask
} from "../controller/taskcontoller.js";
import e from "express";

const router = e.Router();

router.route("/create").post(Taskcreate);
router.route("/:idfortask").get(getbyIDTask);

export default router;