import { AssignedTaskcreateService, AssignedTaskgetbyID, AssignedTaskgetall, updateAssignedTaskById} from "../services/assigned_task_service.js";
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

  export const Asseignedgetall = async (req, res, next) => { // Corrected: Added req
    try {
      // console.log("hello");
      const tasks = await AssignedTaskgetall();
      console.log("Assigned Tasks from service:", tasks); // Log tasks from service
      if (tasks && tasks.length > 0) { // Check if tasks is not null and has elements
        return res.status(SUCCESS).send(tasks);
      } else {
        return res.status(NOTFOUND).send({
          message: "No Assigned tasks found.",
        });
      }
    } catch (error) {
      console.error("Error during Assigned task retrieval:", error);
      return next("Something went wrong", SERVERERROR);
    }
  };

  export const AssignedTaskupdate = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const { status } = req.body;
      if (!_id) {
        console.log("Invalid request: Assigned Task ID is empty");
        return res.status(BADREQUEST).send({ message: "Assigned Task ID is required" });
      }
      const updatedTask = await updateAssignedTaskById(_id, req.body);
      if (updatedTask) {
        return res.status(SUCCESS).send({
          message: "Assigned Task updated successfully.",
          task: updatedTask,
        });
      } else {
        return res.status(NOTFOUND).send({
          message: "Assigned Task not found.",
        });
      }
    } catch (error) {
      console.error("Error during Assigned task update:", error);
      return next("Something went wrong", SERVERERROR);
    }
  };
  