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

  export const RejectedTaskgetbyID = async (idfortask) => {
    try {
      const task = await RejectedTaskModel.find({ idfortask: idfortask });
      console.log("TaskgetbyID:", idfortask);
      return task;
    } catch (error) {
      console.error("Error in TaskgetbyID:", error);
      throw error;
    }
};