import { TaskcreateService, TaskgetbyID } from "../services/taskservices.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";

export const Taskcreate = async (req, res) => {
  try {
    console.log("Task creation request body:", req.body);

    const taskData = req.body;
    const task = await TaskcreateService(taskData);

    return res.status(201).send({
      message: "Task added successfully.",
      task: task,
    });
  } catch (error) {
    console.error("Error during task creation:", error);
    return res.status(BADREQUEST).send({
      message: "Failed to add task.",
      error: error.message,
    });
  }
};

export const getbyIDTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await TaskgetbyID(taskId);
    if (task) {
      return res.status(SUCCESS).send(task);
    }
    return next("Task not found", NOTFOUND);
  } catch (error) {
    console.error("Error during task retrieval:", error);
    return next("Something went wrong", SERVERERROR);
  }
};
