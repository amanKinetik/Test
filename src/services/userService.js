import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import userModel from '../models/user.js';

export async function login (req, res, next) {
  try {
    const { body } = req;
    const { username, password } = body;

    const user = await userModel.findOne({ username });
    const match = bcrypt.compareSync(password, user.password);
    if (!user || !match)
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Login Failed"
      });
    else
      res.status(StatusCodes.OK).send({
        message: "Success",
        user
      });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function getUsers (req, res, next) {
  try {
    const { query: filter } = req;
    const users = await userModel.find(filter);
    res.status(StatusCodes.OK).send({
      message: "Successfully fetched users",
      users
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function getUserById (req, res, next) {
  try {
    const { query: { userId } } = req;

    const user = await userModel.findOne({ userId });
    
    if (!user)
      res.status(StatusCodes.NOT_FOUND).send({
        message: "User not found"
      });

    res.status(StatusCodes.OK).send({
      message: "Successfully fetched user data",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function createUser (req, res, next) {
  try {
    const { body } = req;
    const user = await new userModel(body).save();
    res.status(StatusCodes.OK).send({
      message: "Successfully Created User",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function updateUser (req, res, next) {
  try {
    const { body, query: { username } } = req;
    const updatedUser = await userModel.findOneAndUpdate(
      { username },
      body,
      { new: true }
    );
    res.status(StatusCodes.OK).send({
      message: "Successfully updated user",
      updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function deleteUserById (req, res, next) {
  try {
    const { query: { userId } } = req;
    await userModel.deleteOne({ userId });
    res.status(StatusCodes.OK).send();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}
