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

export const TaskgetbyID = async (idfortask) => {
  try {
    const task = await Task.find({ idfortask: idfortask });
    return task;
  } catch (error) {
    console.error("Error in TaskgetbyID:", error);
    throw error;
  }
};

export const updateTaskById = async (idfortask, data) => {
  try {
    const task1 = await Task.findByIdAndUpdate(idfortask, data, {
      new: true,
      runValidators: true,
    });
    return task1;
  } catch (error) {
    console.error("Error in updateTaskById:", error);
    throw error;
  }
};

export const Taskgetall = async () => {
  try {
    const tasks = await Task.find(); // Use Task.find() to retrieve all tasks
    return tasks;
  } catch (error) {
    console.error("Error in Taskgetall:", error);
    throw error;
  }
};
