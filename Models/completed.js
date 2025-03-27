import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const CompletedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
  deadline_date: {
    type: Date,
    required: true,
  },
  completed_at: {
    type: Date,
  },
  amount: {
    type: Number,
    required: true,
  },
  mentor:{
    type: String,
    required: true,
  },
  mode:{
    type:String,
    required:true
  },
  idfortask: {
    type: String,
    required: true,
  },
});
const Completed = mongoose.model("Completed", CompletedSchema);
export default Completed;
// task name
// task description
// required skills

/*
  
*/ 
