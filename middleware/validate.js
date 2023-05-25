const validator = require("../helpers/validate");

const saveUser = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    password: "required|string",
    displayName: "string",
    email: "required|email",
    phoneNumber: "string",
    profile: {
      experience: "array",
      education: "array",
      projects: "array",
      skills: "array"
    }
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

const saveMusic = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    artist: "required|array",
    album: "required|string",
    genre: "array",
    duration: "numeric",
    releaseDate: "string",
    lyrics: "string",
    rating: "numeric",
    plays: "numeric"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  saveMusic
};
