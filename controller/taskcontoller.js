import {
  TaskcreateService,
  TaskgetbyID,
  updateTaskById,
  Taskgetall,
} from "../services/taskservices.js";
import { BADREQUEST, SUCCESS, NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";

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
    const { status } = req.body;
    if (!_id) {
      console.log("Invalid request: update Task ID is empty");
      return res.status(BADREQUEST).send({ message: "update Task ID is required" });
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

export const getall = async (req, res, next) => { // Corrected: Added req
  try {
    console.log("hello");
    const tasks = await Taskgetall();
    console.log("Tasks from service:", tasks); // Log tasks from service
    if (tasks && tasks.length > 0) { // Check if tasks is not null and has elements
      return res.status(SUCCESS).send(tasks);
    } else {
      return res.status(NOTFOUND).send({
        message: "No tasks found.",
      });
    }
  } catch (error) {
    console.error("Error during task retrieval:", error);
    return next("Something went wrong", SERVERERROR);
  }
};
