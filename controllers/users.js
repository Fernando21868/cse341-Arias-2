const db = require("../models");
const Users = db.users;

exports.getUsersRoute = async (req, res) => {
  try {
    const data = await Users.find({});
    if (!data) {
      res.status(404).send({ message: "Not found any user." });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving users.",
      error: err
    });
  }
};

exports.getUserByIdRoute = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Users.find({ _id: userId });
    if (!data) {
      res
        .status(404)
        .send({ message: "Not found user with the id specified." });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving user with the title specified.",
      error: err
    });
  }
};

exports.createUserRoute = async (req, res) => {
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
      res
        .status(404)
        .send({ message: "It was not possible to create the user." });
    } else {
      console.log(data);
      res.status(201).json(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while creating the user.",
      error: err
    });
  }
};

exports.updateUserRoute = async (req, res) => {
  try {
    const { userId } = req.params;
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      profile: req.body.profile
    };
    const data = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: newUser },
      { new: true }
    );
    if (!data) {
      res
        .status(404)
        .send({ message: "It was not possible to update the user" });
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while updating the user.",
      error: err
    });
  }
};

exports.deleteUserRoute = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Users.deleteOne({ _id: userId });
    if (!data) {
      res.status(404).send({ message: "Not found theme with id to delete." });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error deleting user with the id specified.",
      error: err
    });
  }
};
