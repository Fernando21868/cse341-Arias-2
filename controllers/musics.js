const { ObjectId } = require("mongodb");
const db = require("../models");
const Musics = db.musics;

exports.getMusicByNameRoute = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.musicId)) {
      res.status(400).json("Must use a valid user id to update a contact.");
    }
    const musicId = new ObjectId(req.params.musicId);
    const data = await Musics.find({ _id: musicId });
    if (!data) {
      res
        .status(404)
        .send({ message: "Not found theme with the Id specified." });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving music with the title specified.",
      error: err
    });
  }
};

exports.getMusicRoute = async (req, res) => {
  try {
    const data = await Musics.find({});
    if (!data) {
      res.status(404).send({ message: "Not found any music" });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving music.",
      error: err
    });
  }
};

exports.createMusicRoute = async (req, res) => {
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
      res
        .status(404)
        .send({ message: "It was not possible to create the music" });
    } else {
      console.log(data);
      res.status(201).json(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while creating the music.",
      error: err
    });
  }
};

exports.updateMusicRoute = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.musicId)) {
      res.status(400).json("Must use a valid user id to update a contact.");
    }
    const musicId = new ObjectId(req.params.musicId);
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
    const data = await Musics.findOneAndUpdate(
      { _id: musicId },
      { $set: newMusic },
      { new: true }
    );
    if (!data) {
      res
        .status(404)
        .send({ message: "It was not possible to create the music" });
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while updating the music.",
      error: err
    });
  }
};

exports.deleteMusicRoute = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.musicId)) {
      res.status(400).json("Must use a valid user id to update a contact.");
    }
    const musicId = new ObjectId(req.params.musicId);
    const data = await Musics.deleteOne({ _id: musicId });
    if (!data) {
      res.status(404).send({ message: "Not found theme with id to delete." });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error deleting music with the title specified.",
      error: err
    });
  }
};
