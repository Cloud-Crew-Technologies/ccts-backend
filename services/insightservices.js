import Insight from "../Models/insight.js";

export const InsightcreateService = async (data) => {
  try {
    const insight = new Insight(data);
    await insight.save();
    return insight;
  } catch (error) {
    console.error("Error in InsightcreateService:", error);
    throw error;
  }
};

export const InsightgetbyID = async (uniqueid) => {
  try {
    const insight = await Insight.findOne({ uniqueid: uniqueid });
    return insight;
  } catch (error) {
    console.error("Error in InsightgetbyID:", error);
    throw error;
  }
};
