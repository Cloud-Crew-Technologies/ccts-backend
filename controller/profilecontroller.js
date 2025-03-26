import { SUCCESS, BADREQUEST,NOTFOUND,UNAUTHORIZED,SERVERERROR } from "../constant/statuscode.js";
import { getProfile, getProfileById, createProfile, updateProfileById } from "../services/profileservices.js";

export const getAll = async (req, res, next) => {
  try {
    const users = await getProfile();
    return res.status(SUCCESS).send(users);
  } catch (error) {
    console.error(error);
    return next("Something went wrong", 400);
  }
};

export const getUserbyID = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) {
      console.log("Invalid request: email is empty");
      return res.status(BADREQUEST).send({ message: "Email is required" });
    }
    const user = await getProfileById(email);
    if (user) {
      return res.status(SUCCESS).send(user);
    } else {
      return res.status(NOTFOUND).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const newProfile = async (req, res, next) => {
  try {
    const profiledata = req.body;
    const profile = await createProfile(profiledata);
    return res.status(SUCCESS).send({
      message: "Profile added successfully.",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(BADREQUEST).send({
      message: "Failed to add user.",
      error: error.message,
    });
  }
};

export const newProfileById = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) {
      console.log("Invalid request: Email is empty");
      return res.status(BADREQUEST).send({ message: "Email is required" });
    }
    const updatedUser = await updateProfileById(email, req.body);
    if (updatedUser) {
      return res.status(SUCCESS).send({
        message: "Profile updated successfully.",
        user: updatedUser,
      });
    } else {
      return res.status(NOTFOUND).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error: ", error);
    return res.status(SERVERERROR).send({ message: "Internal server error" });
  }
};