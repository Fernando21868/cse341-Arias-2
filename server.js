const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("./config/passport")(passport);

const port = process.env.PORT || 8080;
const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))
  .use("/auth", require("./routes/auth"));

app.use((req, res, next) => {
  next(createError(404, "Not found."));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the databse!", err);
    process.exit();
  });
