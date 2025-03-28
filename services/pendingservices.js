import PendingTask from "../Models/pending.js";

export const PendingTaskcreateService = async (data) => {
  try {
    const pendingtask = new PendingTask(data);
    await pendingtask.save();
    return pendingtask;
  } catch (error) {
    console.error("Error in Pending TaskcreateService:", error);
    throw error;
  }
};

export const PendingTaskgetbyID = async (idfortask) => {
  try {
    const pendingtask = await PendingTask.find({ idfortask: idfortask });
    return pendingtask;
  } catch (error) {
    console.error("Error in Pending TaskgetbyID:", error);
    throw error;
  }
};
export const updatePendingTaskById = async (idfortask, data) => {
    try {
        const task1 = await PendingTask.findByIdAndUpdate(idfortask, data, {
          new: true,
          runValidators: true,}
        );
        return task1;
      } catch (error) {
        console.error("Error in pending updateTaskById:", error);
        throw error;
    }
  }


  export const PendingTaskgetall = async () => {
    try {
      const tasks = await PendingTask.find(); // Use Task.find() to retrieve all tasks
      return tasks;
    } catch (error) {
      console.error("Error in Taskgetall:", error);
      throw error;
    }
  };