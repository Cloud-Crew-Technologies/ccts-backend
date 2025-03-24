
import Rejected from "../Models/rejected.js";

export const RejectedloginService = async (email, password) => {
  try {
    console.log("Attempting login with email:", email);
    const user = await Rejected.findOne({
      email: email,
    });

    if (!user) {
      console.log("User not found for email:", email);
      return null;
    }

    console.log("User found:", user);
    if (!user.validPassword(password)) {
      console.log("Password does not match for email:", email);
      return null;
    }
    console.log("User authenticated successfully.");
    return user;
  } catch (error) {
    console.error("Error in loginUserService:", error);
    throw error;
  }
};

export const RejectedsignServices = async (data) => {
  try {

    const {
      name,
      email,
      mobileno,
      domain,
      address,
      pancard,
      dob,
      skills,
      college,
      degree,
      yearofstudying,
      yearofpassing,
      github,
      linkedin,
      uniqueid,
      password,
      hash,
      salt,
    } = data;

    const user = new Rejected({
      name,
      email,
      mobileno,
      domain,
      address,
      pancard,
      dob,
      skills,
      college,
      degree,
      yearofstudying,
      yearofpassing,
      github,
      linkedin,
      uniqueid,
      password: password,
      hash,
      salt,
    });

    //user.setPassword(data.password);

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.salt;
    delete userResponse.hash;
    return userResponse;
  } catch (error) {
    console.error("Error in signUserServices:", error);
    throw error;
  }
};

export const getResumeForUser = async (userId) => {
  try {
    const user = await Rejected.findById(userId);

    if (!user || !user.resume) {
      throw new Error("Resume not found");
    }

    return {
      data: user.resume,
      contentType: "application/pdf",
    };
  } catch (error) {
    console.error("Error in getUserResumeService:", error);
    throw error;
  }
};

export const Rejectedget = async (uniqueid) => {
  try {
    const result = await Rejected.findOne({ uniqueid: uniqueid });
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const RejectedgetAll = async () => {
  try {
    const result = await Rejected.find();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
