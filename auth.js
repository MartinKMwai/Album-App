var User = require("../models/user"),
  passport = require("passport"),
  express = require("express"),
  router = express.Router();

var Images = require("../models/images");
var Medialist = require("../models/medialist");

router.get("/", function (req, res) {
  return res.status(200).json({
    message: "Healthy heart beat",
  });
});

router.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username,
    friends: req.body.friends,
  });
  console.log(newUser);
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "There was an error registering the user account.",
        error: err.message,
      });
    }

    return res.json({
      user: user,
      message: "Success",
    });
  });
});

router.post("/createMediaList", function (req, res) {
  const url = req.body.url;
  const userId = req.body.userId;
  const likedby = req.body.likedby;
  const medialistObj = {
    userId: userId,
    url: url,
    likedBy: likedby,
    // username: req.body.username,
  };
  console.log(medialistObj);
  Medialist.create(medialistObj, function (err, media) {
    if (err) {
      return res.status(401).json({
        message: "There was an error creating a new media list object.",
        error: err.message,
      });
    }

    return res.json({
      message: "Success",
      media: media,
    });
  });
});

router.get("/getAlbumsById/:userId", function (req, res) {
  Medialist.find({ userId: req.params.userId }, function (err, media) {
    if (err) {
      return res.status(401).json({
        message: err.message,
        status: "Error",
      });
    }
    return res.json({
      status: "Success",
      media: media,
    });
  });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      res.status(401).json({
        message: err.message,
        status: "Error",
      });
    }
    if (!user) {
      return res.status(401).json({
        message: err.message,
        status: "Error",
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(401).json({
          message: err.message,
          status: "Error",
        });
      }
      return res.json({
        message: "Success",
        user: user,
      });
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return res.status(401).json({
        message: err.message,
        status: "Error",
      });
    }
    return res.status(200).json({
      message: "Success",
    });
  });
});

router.get("/users", function (req, res) {
  console.log("users");
  User.find({}, function (err, users) {
    console.log(users);
    if (err) {
      return res.status(401).json({
        message: err.message,
        status: "Error",
      });
    }

    return res.json({
      status: "Success",
      users: users,
    });
  });
});

// router.get("/images", function (req, res) {
//   User.find({}, function (err, users) {
//     if (err) {
//       res.status(401).json({
//         message: err.message,
//         status: "Error",
//       });
//     }
//     return res.status(200).json({
//       message: users,
//       status: "Success",
//     });
//   });
// });

router.get("/images/:userId", function (req, res) {
  Images.findOne(req.params.userId, function (err, images) {
    if (err) {
      res.status(401).json({
        message: err.message,
        status: "Error",
      });
    }
    return res.status(200).json({
      images: images,
      status: "Success",
    });
  });
});

module.exports = router;
