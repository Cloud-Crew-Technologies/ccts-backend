import Profiles from "../Models/profilemodel.js";
import express from "express";

export const getProfile = async () => {
  try {
    const profile = await Profiles.find();
    return profile;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getProfileById = async (name) => {
  try {
    const profile = await Profiles.findOne({ name: name });
    return profile;
  } catch (error) {
    console.log("Error: ", error);
  }
};
export const createProfile = async (data) => {
  try {
    const profile = new Profiles(data);
    console.log(data.password);
    if (!data.password) {
      throw new Error("Password is required");
    }

    profile.setPassword(data.password);
    await profile.save();
    const userResponse = profile.toObject();
    delete userResponse.hash;
    delete userResponse.salt;
    return userResponse;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
export const updateProfileById = async (name, data) => {
  try {
    const profile = await Profiles.findOneAndUpdate({ name: name }, data, {
      new: true,
    });
    return profile;
    // res.status(200).json({profile});
    // if(!profile) {
    //     return res.status(404).json({message: 'Profile not found'});}
    //     const updatedProfile = await Profile.findById(req.params.id);
    //     res.json(updatedProfile);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const loginProfileService = async (email, password) => {
  try {
    console.log("Attempting login with email:", email);
    const user = await Profiles.findOne({
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


