module.exports = (mongoose) => {
  const Users = mongoose.model(
    "users",
    mongoose.Schema({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      googleId: {
        type: String,
        required: true
      },
      displayName: {
        type: String,
        required: true
      },
      email: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      profile: {
        experience: {
          type: [String]
        },
        education: {
          type: [String]
        },
        projects: {
          type: [String]
        },
        skills: {
          type: [String]
        }
      }
    })
  );
  return Users;
};

