import { AssignedTaskcreateService, AssignedTaskgetbyID} from "../services/assigned_task_service.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";


export const AssignedTaskcreate = async (req, res) => {
    try {
      console.log("Task creation request body:", req.body);
  
      const taskData = req.body;
      const task = await AssignedTaskcreateService(taskData);
  
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
  export const assignedgetbyIDTask = async (req, res, next) => {
    try {
      const { idfortask } = req.params;
  
      const task = await AssignedTaskgetbyID(idfortask);
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