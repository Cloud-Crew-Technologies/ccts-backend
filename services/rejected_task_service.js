import RejectedTaskModel from "../Models/rejected_task.js";

export const RejectedTaskcreateService = async (data) => {
    try {
      const task = new RejectedTaskModel(data);
      await task.save();
      return task;
    } catch (error) {
      console.error("Error in TaskcreateService:", error);
      throw error;
    }
  };

  export const RejectedTaskgetall = async () => {
    try {
      const tasks = await RejectedTaskModel.find(); // Use Task.find() to retrieve all tasks
      return tasks;
    } catch (error) {
      console.error("Error in Rejected Taskgetall:", error);
      throw error;
    }
  };

  export const RejectedTaskgetbyID = async (idfortask) => {
    try {
      const task = await RejectedTaskModel.find({ idfortask: idfortask });
      console.log("Rejected TaskgetbyID:", idfortask);
      return task;
    } catch (error) {
      console.error("Error in Rejected TaskgetbyID:", error);
      throw error;
    }
};

export const updateRejectedTaskById = async (idfortask, data) => {
  try {
    const task1 = await RejectedTaskModel.findByIdAndUpdate(idfortask, data, {
      new: true,
      runValidators: true,
    });
    return task1;
  } catch (error) {
    console.error("Error in updateTaskById:", error);
    throw error;
  }
};