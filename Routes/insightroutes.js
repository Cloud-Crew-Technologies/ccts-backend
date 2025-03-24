import {
  Insightcreate,
  getbyIdInsight,
} from "../controller/insightcontroller.js";
import express from "express";
const router = express.Router();

router.route("/create").post(Insightcreate);
router.route("/:id").get(getbyIdInsight);

export default router;
