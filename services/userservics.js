// userservics.js
import Users from "../Models/user.js";

export const UserloginService = async (email, password) => {
  try {
    console.log("Attempting login with email:", email);
    const user = await Users.findOne({
      email: email,
    });

    if (!user) {
      console.log("User not found for email:", email);
      return null;
    }

    console.log("User found:", user);
    console.log("Provided password:", password);
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

export const UsersignServices = async (data) => {
  try {
    console.log("Data received in UsersignServices:", data);

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

    const user = new Users({
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

    console.log("User object before setPassword:", user);
    //user.setPassword(data.password);

    await user.save();

    console.log("User object before toObject:", user);
    const userResponse = user.toObject();
    delete userResponse.salt;
    delete userResponse.hash;

    console.log("User object after toObject:", userResponse);
    return userResponse;
  } catch (error) {
    console.error("Error in signUserServices:", error);
    throw error;
  }
};

export const getResumeForUser = async (userId) => {
  try {
    const user = await Users.findById(userId);

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

export const Userget = async (uniqueid) => {
  try {
    const result = await Users.findOne({ uniqueid: uniqueid });
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const UsersgetAll = async () => {
  try {
    const result = await Users.find();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
