module.exports = (mongoose) => {
  const Users = mongoose.model(
    "users",
    mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      displayName: {
        type: String
      },
      email: {
        type: String,
        required: true
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
