module.exports = (mongoose) => {
  const Users = mongoose.model(
    "users",
    mongoose.Schema({
      username: {
        type: String
      },
      password: {
        type: String
      },
      displayName: {
        type: String
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
