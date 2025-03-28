import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
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
  mentor: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  idfortask: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });
const Task = mongoose.model("Task", TaskSchema);
export default Task;
// task name
// task description
// required skills

/*
  
*/
