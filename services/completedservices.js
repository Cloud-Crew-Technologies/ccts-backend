import CompletedTask from "../Models/completed.js";

export const CompletedTaskcreateService = async (data) => {
  try {
    const c_task = new CompletedTask(data);
    await c_task.save();
    return c_task;
  } catch (error) {
    console.error("Error in Completed TaskcreateService:", error);
    throw error;
  }
};

export const CompletedTaskgetbyID = async (idfortask) => {
  try {
    const c_task = await CompletedTask.find({ idfortask: idfortask });
    console.log("Completed TaskgetbyID:", idfortask);
    return c_task;
  } catch (error) {
    console.error("Error in Completed TaskgetbyID:", error);
    throw error;
  }
};
export const updateCompletedTaskById = async (idfortask, data) => {
    try {
        const task1 = await CompletedTask.findByIdAndUpdate(idfortask, data, {
          new: true,
          runValidators: true,}
        );
        return task1;
      } catch (error) {
        console.error("Error in Completed updateTaskById:", error);
        throw error;
    }
  }