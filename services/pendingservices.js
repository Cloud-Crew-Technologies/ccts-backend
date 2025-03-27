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
    console.log("Pending TaskgetbyID:", idfortask);
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