import Task from "../Models/task.js";

export const TaskcreateService = async (data) => {
  try {
    const task = new Task(data);
    await task.save();
    return task;
  } catch (error) {
    console.error("Error in TaskcreateService:", error);
    throw error;
  }
};

export const TaskgetbyID = async (uniqueid) => {
  try {
    const task = await Task.findOne({ uniqueid: uniqueid });
    console.log("TaskgetbyID:", uniqueid);
    return task;
  } catch (error) {
    console.error("Error in TaskgetbyID:", error);
    throw error;
  }
};
