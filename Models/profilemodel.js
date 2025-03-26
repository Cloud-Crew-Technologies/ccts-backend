import mongoose from "mongoose";


const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    personalInfo: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    dob: { type: Date, required: true },
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    projectMembers: { type: Number, required: true }
});

const profile = mongoose.model('Profile', profileSchema);
export default profile;

