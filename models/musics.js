module.exports = (mongoose) => {
  const Musics = mongoose.model(
    "musics",
    mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      artist: {
        type: [String],
        required: true
      },
      album: {
        type: String,
        required: true
      },
      genre: {
        type: [String]
      },
      duration: {
        type: Number
      },
      releaseDate: {
        type: String
      },
      lyrics: {
        type: String
      },
      rating: {
        type: Number
      },
      plays: {
        type: Number
      }
    })
  );
  return Musics;
};

