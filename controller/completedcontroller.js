import { CompletedTaskcreateService, CompletedTaskgetbyID, updateCompletedTaskById } from "../services/completedservices.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";

export const completedcreate = async (req, res) => {
  try {
    console.log("Completed Task creation request body:", req.body);

    const completedtaskData = req.body;
    const completedtask = await CompletedTaskcreateService(completedtaskData);

    return res.status(201).send({
      message: "Completed Task added successfully.",
      task: completedtask,
    });
  } catch (error) {
    console.error("Error during Completed task creation:", error);
    return res.status(BADREQUEST).send({
      message: "Failed to add Completed task.",
      error: error.message,
    });
  }
};

export const getbyIDcompletedTask = async (req, res, next) => {
  try {
    const { idfortask } = req.params;

    const task = await CompletedTaskgetbyID(idfortask);
    if (task) {
      return res.status(SUCCESS).send(task);
    } else {
      return res.status(NOTFOUND).send({
        message: "Completed Task not found.",
      });
    }
  } catch (error) {
    console.error("Error during Completed task retrieval:", error);
    return next("Something went wrong", SERVERERROR);
  }
};
export const completedupdateid = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const {status} = req.body;
      if (!_id) {
        console.log("Invalid request: CompletedTask ID is empty");
        return res.status(BADREQUEST).send({ message: "CompletedTask ID is required" });
      }
      const updatedTask = await updateCompletedTaskById(_id, req.body);
      if (updatedTask) {
        return res.status(SUCCESS).send({
          message: "Completed Task updated successfully.",
          task: updatedTask,
        });
      } else {
        return res.status(NOTFOUND).send({
          message: "Completed Task not found.",
        });
      }
    } catch (error) {
      console.error("Error during Completed task update:", error);
      return next("Something went wrong", SERVERERROR);
    }
  };
