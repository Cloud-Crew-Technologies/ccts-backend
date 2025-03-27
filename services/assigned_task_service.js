import AssignedTaskModel from "../Models/assigned_task.js";

export const AssignedTaskcreateService = async (data) => {
    try {
      const task = new AssignedTaskModel(data);
      await task.save();
      return task;
    } catch (error) {
      console.error("Error in TaskcreateService:", error);
      throw error;
    }
  };

  export const AssignedTaskgetbyID = async (idfortask) => {
    try {
      const task = await AssignedTaskModel.find({ idfortask: idfortask });
      console.log("TaskgetbyID:", idfortask);
      return task;
    } catch (error) {
      console.error("Error in TaskgetbyID:", error);
      throw error;
    }
};