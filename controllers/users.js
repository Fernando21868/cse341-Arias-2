const createError = require("http-errors");
const mongoose = require("mongoose");

const db = require("../models");
const Users = db.users;

exports.getUsersRoute = async (req, res, next) => {
  try {
    const data = await Users.find({});
    if (!data) {
      throw createError(404, "Music does not exist.");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    next(createError(500, "Error retrieving users."));
  }
};

exports.getUserByIdRoute = async (req, res, next) => {
  try {
    // if (!ObjectId.isValid(req.params.userId)) {
    //   res.status(400).json("Must use a valid user id to get a contact.");
    // }
    // const { userId } = new ObjectId(req.params.userId);
    const userId = req.params.userId;
    const data = await Users.findById({ _id: userId });
    if (!data) {
      throw createError(404, "User does not exist.");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid User id."));
      return;
    }
    next(err);
  }
};

exports.createUserRoute = async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      profile: req.body.profile
    };
    const user = new Users(newUser);
    const data = await user.save();
    if (!data) {
      throw createError(400, "User was not created.");
    }
    console.log(data);
    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    if (err.name === "ValidationError") {
      next(createError(422, err.message));
      return;
    }
    next(err);
  }
};

exports.updateUserRoute = async (req, res, next) => {
  try {
    // if (!ObjectId.isValid(req.params.userId)) {
    //   res.status(400).json("Must use a valid user id to update a contact.");
    // }
    // const { userId } = new ObjectId(req.params.userId);
    const userId = req.params.userId;
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      profile: req.body.profile
    };
    const data = await Users.findByIdAndUpdate(
      { _id: userId },
      { $set: newUser },
      { new: true }
    );
    if (!data) {
      throw createError(400, "User does not exist.");
    }
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid User id."));
      return;
    }
    next(err);
  }
};

exports.deleteUserRoute = async (req, res, next) => {
  try {
    // if (!ObjectId.isValid(req.params.userId)) {
    //   res.status(400).json("Must use a valid user id to delete a contact.");
    // }
    // const { userId } = new ObjectId(req.params.userId);
    const userId = req.params.userId;
    const data = await Users.findByIdAndDelete({ _id: userId });
    if (!data) {
      throw createError(400, "User does not exist.");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid User id."));
      return;
    }
    next(err);
  }
};
