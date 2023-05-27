const createError = require("http-errors");
const mongoose = require("mongoose");

const db = require("../models");
const Musics = db.musics;

exports.getMusicRoute = async (req, res, next) => {
  try {
    const data = await Musics.find({});
    if (!data) {
      throw createError(404, "Music does not exist.");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    next(createError(500, "Error retrieving musics."));
  }
};

exports.getMusicByNameRoute = async (req, res, next) => {
  try {
    // if (!ObjectId.isValid(req.params.musicId)) {
    //   res.status(400).json("Must use a valid user id to update a contact.");
    // }
    // const musicId = new ObjectId(req.params.musicId);
    const musicId = req.params.musicId;
    const data = await Musics.findById({ _id: musicId });
    if (!data) {
      throw createError(404, "Music does not exist.");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid Music id."));
      return;
    }
    next(err);
  }
};

exports.createMusicRoute = async (req, res, next) => {
  try {
    const newMusic = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      lyrics: req.body.lyrics,
      rating: req.body.rating,
      plays: req.body.plays
    };
    const music = new Musics(newMusic);
    const data = await music.save();
    if (!data) {
      throw createError(400, "Music was not created.");
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

exports.updateMusicRoute = async (req, res, next) => {
  try {
    // if (!ObjectId.isValid(req.params.musicId)) {
    //   res.status(400).json("Must use a valid user id to update a contact.");
    // }
    // const musicId = new ObjectId(req.params.musicId);
    const musicId = req.params.musicId;
    const newMusic = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      lyrics: req.body.lyrics,
      rating: req.body.rating,
      plays: req.body.plays
    };
    const data = await Musics.findByIdAndUpdate(
      { _id: musicId },
      { $set: newMusic },
      { new: true }
    );
    if (!data) {
      throw createError(400, "Music does not exist.");
    }
    console.log(data);
    res.status(204).json(data);
  } catch (err) {
    console.log(err.message);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid Music id."));
      return;
    }
    next(err);
  }
};

exports.deleteMusicRoute = async (req, res, next) => {
  try {
    // if (!ObjectId.isValid(req.params.musicId)) {
    //   res.status(400).json("Must use a valid user id to update a contact.");
    // }
    // const musicId = new ObjectId(req.params.musicId);
    const musicId = req.params.musicId;
    const data = await Musics.findByIdAndDelete({ _id: musicId });
    if (!data) {
      throw createError(400, "Music does not exist.");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid Music id."));
      return;
    }
    next(err);
  }
};
