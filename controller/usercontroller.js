import {
  UserloginService,
  UsersignServices,
  Userget,
  UsersgetAll,
} from "../services/userservics.js";
import { BADREQUEST, SUCCESS } from "../constant/statuscode.js";
import { NOTFOUND, UNAUTHORIZED, SERVERERROR } from "../constant/statuscode.js";

export const usersign = async (req, res) => {
  try {
    console.log("Signup request body:", req.body);

    const userData = req.body;
    const user = await UsersignServices(userData);

    return res.status(201).send({
      message: "User added successfully.",
      user: user,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(BADREQUEST).send({
      message: "Failed to add user.",
      error: error.message,
    });
  }
};

export const userlogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt - Email:", email);
    const user = await UserloginService(email, password);

    if (!user || !user.validPassword(password)) {
      console.log("Login failed - Invalid credentials");
      return next("Email or password is incorrect", UNAUTHORIZED);
    }
    const token = user.generateJWT();

    console.log("Login successful - User:", user.email);

    return res.status(200).send({
      message: "User Logged In",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return next("Something went wrong", SERVERERROR);
  }
};

export const getUserbyID = async (req, res, next) => {
  const { uniqueid } = req.params;
  if (uniqueid === null) {
    console.log("invalid request id is empty");
    return next("Unique ID is required", BADREQUEST);
  }
  const user = await Userget(uniqueid);
  if (user) {
    return res.status(SUCCESS).send(user);
  } else {
    return res.status(NOTFOUND).send({
      message: "User not found",
    });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const users = await UsersgetAll();
    return res.status(SUCCESS).send(users);
  } catch (error) {
    console.error(error);
    return next("Something went wrong", SERVERERROR);
  }
};
