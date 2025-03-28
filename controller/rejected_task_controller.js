import { RejectedTaskcreateService,RejectedTaskgetbyID,updateRejectedTaskById, RejectedTaskgetall} from "../services/rejected_task_service.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";


export const RejectedTaskcreate = async (req, res) => {
    try {
      console.log("Task creation request body:", req.body);
  
      const taskData = req.body;
      const task = await RejectedTaskcreateService(taskData);
  
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
  export const RejectedgetbyIDTask = async (req, res, next) => {
    try {
      const { idfortask } = req.params;
  
      const task = await RejectedTaskgetbyID(idfortask);
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

  export const RejectedTaskupdateById = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const { status } = req.body;
      if (!_id) {
        console.log("Invalid request: Task ID is empty");
        return res.status(BADREQUEST).send({ message: "Rejected Task ID is required" });
      }
      const updatedTask = await updateRejectedTaskById(_id, req.body);
      if (updatedTask) {
        return res.status(SUCCESS).send({
          message: "Rejected Task updated successfully.",
          task: updatedTask,
        });
      } else {
        return res.status(NOTFOUND).send({
          message: "Rejected Task not found.",
        });
      }
    } catch (error) {
      console.error("Error during Rejected task update:", error);
      return next("Something went wrong", SERVERERROR);
    }
  };
  
export const Rejectedgetall = async (req, res, next) => { // Corrected: Added req
  try {
    console.log("hello");
    const tasks = await RejectedTaskgetall();
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