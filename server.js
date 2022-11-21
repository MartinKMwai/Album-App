require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
var authRoutes = require("./routes/auth");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");

// Setting up ports
const connUri =
  process.env.MONGO_PROD_CONN_URL ||
  "mongodb+srv://martin:martin10809@cluster0.kswtpzh.mongodb.net/?retryWrites=true&w=majority";
let PORT = process.env.PORT || 8081;

// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(
  require("express-session")({
    secret: "Album App Secret Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB --  database connection established successfully!")
);
connection.on("error", (err) => {
  console.log(
    `MongoDB connection error. Please make sure MongoDB is running. Err: ${err}`
  );
  process.exit();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configure Routes
app.use(authRoutes);

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
