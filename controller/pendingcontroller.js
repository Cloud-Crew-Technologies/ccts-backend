import { PendingTaskcreateService, PendingTaskgetbyID, updatePendingTaskById } from "../services/pendingservices.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";

export const Pendingcreate = async (req, res) => {
  try {
    console.log("Pending Task creation request body:", req.body);

    const pendingtaskData = req.body;
    const pendingtask = await PendingTaskcreateService(pendingtaskData);

    return res.status(201).send({
      message: "Task added successfully.",
      task: pendingtask,
    });
  } catch (error) {
    console.error("Error during pending task creation:", error);
    return res.status(BADREQUEST).send({
      message: "Failed to add pending task.",
      error: error.message,
    });
  }
};

export const getbyIDPendingTask = async (req, res, next) => {
  try {
    const { idfortask } = req.params;

    const task = await PendingTaskgetbyID(idfortask);
    if (task) {
      return res.status(SUCCESS).send(task);
    } else {
      return res.status(NOTFOUND).send({
        message: "Pending Task not found.",
      });
    }
  } catch (error) {
    console.error("Error during Pending task retrieval:", error);
    return next("Something went wrong", SERVERERROR);
  }
};
export const Pendingupdateid = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const {status} = req.body;
      if (!_id) {
        console.log("Invalid request: PendingTask ID is empty");
        return res.status(BADREQUEST).send({ message: "PendingTask ID is required" });
      }
      const updatedTask = await updatePendingTaskById(_id, req.body);
      if (updatedTask) {
        return res.status(SUCCESS).send({
          message: "Pending Task updated successfully.",
          task: updatedTask,
        });
      } else {
        return res.status(NOTFOUND).send({
          message: "Pending Task not found.",
        });
      }
    } catch (error) {
      console.error("Error during pending task update:", error);
      return next("Something went wrong", SERVERERROR);
    }
  };
