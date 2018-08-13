const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const User = require("./app/models/user.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes for our api
const port = process.env.PORT || 8080;

const router = express.Router();

app.use("/api", router);

router.get("/", function(req, res) {
  res.json({ message: "welcome to your api :)" });
});

//Base setup
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restfulapi");

//User routes
router
  .route("/user")
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);
      res.send(users);
    });
  })

  .post(function(req, res) {
    const user = new User();
    console.log("Try to register user " + req.body.name);
    user.name = req.body.name;
    res.send(user);

    user.save(function(req, res) {
      res.json({ message: "User created" });
    });
  });

//Start the server
app.listen(port);
console.log("Magic happens on port " + port);
