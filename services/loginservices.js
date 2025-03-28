import Login from "../Models/login.js";

export const loginUserService = async (email, password) => {
  try {
    console.log("Attempting login with email:", email);
    const user = await Login.findOne({
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

export const signUserServices = async (data, resumeFile) => {
  try {
    // if (!resumeFile) {
    //   throw new Error("Resume file is required");
    // }

    const userData = {
      name: data.name,
      email: data.email,
      mobileno: data.mobileno,
      password: data.password,
      domain: data.domain,
      address: data.address,
      pancard: data.pancard,
      dob: data.dob,
      skills: data.skills,
      college: data.college,
      degree: data.degree,
      yearofstudying: data.yearofstudying,
      yearofpassing: data.yearofpassing,
      github: data.github,
      linkedin: data.linkedin,
      uniqueid: data.uniqueid,
    };
    const user = new Login(userData);
    user.setPassword(data.password);
    // user.hash = user.setPassword(data.password);

    // user.resume = {
    //   filename: resumeFile.originalname,
    //   contentType: resumeFile.mimetype,
    //   size: resumeFile.size,
    // };
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.hash;
    delete userResponse.salt;
    delete userResponse.resume;
    return userResponse;
  } catch (error) {
    console.error("Error in signUserServices:", error);
    throw error;
  }
};

export const getResumeForUser = async (userId) => {
  try {
    const user = await Login.findById(userId);

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

export const getUser = async (uniqueid) => {
  try {
    const result = await Login.findOne({ uniqueid: uniqueid });
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const result = await Login.find();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const DeleteUser = async (uniqueid) => {
  try {
    const result = await Login.deleteOne({ uniqueid: uniqueid });
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};