import { TaskcreateService, TaskgetbyID, updateTaskById } from "../services/taskservices.js";
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
    const { idfortask } = req.params;

    const task = await TaskgetbyID(idfortask);
    if (task) {
      return res.status(SUCCESS).send(task);
    } else {
      return res.status(NOTFOUND).send({
        message: "Task not found.",
      });
    }
  } catch (error) {
    console.error("Error during task retrieval:", error);
    return next("Something went wrong", SERVERERROR);
  }
};

export const updateByID = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const {status} = req.body;
    if (!_id) {
      console.log("Invalid request: Task ID is empty");
      return res.status(BADREQUEST).send({ message: "Task ID is required" });
    }
    const updatedTask = await updateTaskById(_id, req.body);
    if (updatedTask) {
      return res.status(SUCCESS).send({
        message: "Task updated successfully.",
        task: updatedTask,
      });
    } else {
      return res.status(NOTFOUND).send({
        message: "Task not found.",
      });
    }
  } catch (error) {
    console.error("Error during task update:", error);
    return next("Something went wrong", SERVERERROR);
  }
};
