import {
  InsightcreateService,
  InsightgetbyID,
} from "../services/insightservices.js";

export const Insightcreate = async (req, res) => {
  try {
    console.log(req.body);
    const insight = await InsightcreateService(req.body);
    res.status(201).json(insight);
  } catch (error) {
    console.error("Error in Insightcreate:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getbyIdInsight = async (req, res) => {
  try {
    const insight = await InsightgetbyID(req.params.id);
    res.status(200).json(insight);
  } catch (error) {
    console.error("Error in InsightgetbyId:", error);
    res.status(400).json({ message: error.message });
  }
};
