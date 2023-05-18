module.exports = (mongoose) => {
  const Musics = mongoose.model(
    "musics",
    mongoose.Schema({
      title: {
        type: String
      },
      artist: {
        type: [String]
      },
      album: {
        type: String
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
