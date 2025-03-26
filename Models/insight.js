import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const InsightSchema = new mongoose.Schema({
  skills: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  task: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  work: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  uniqueid: {
    type: Number,
    required: true,
    unique: true,
  },
  skilldescription: {
    type: String,
  },
  taskdescription: {
    type: String,
  },
  workdescription: {
    type: String,
  },
});

const Insight = mongoose.model("Insight", InsightSchema);
export default Insight;
