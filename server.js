const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const User = require("./app/models/user.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes for our api
const port = process.env.PORT || 8080;

const router = express.Router();

router.get("/", function(req, res) {
  res.json({ message: "welcome to your api :)" });
});

//Base setup
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restfulapi");

//User routes
router
  .route("/users")
  .post(function(req, res) {
    const user = new User();
    user.name = req.body.name;
    user.country = req.body.county;
    //caused bug for some reason
    // res.send(user);

    user.save(function() {
      res.json({ message: "User created" });
    });
  })

  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);

      res.send(users);
    });
  })

  .delete(function(req, res) {
    User.remove({}, function() {
      res.json({ message: "You just killed everyone..." });
    });
  });

router
  .route("/users/:user_id")

  .get(function(req, res) {
    // User.findById(req.params.user_id, function(err, user) {
    //   if (err) res - send(err);

    //   res.json(user);
    // });
    
  })
  .delete(function(req, res) {
    User.remove(
      {
        _id: req.params.user_id
      },
      function(err, user) {
        if (err) res.send(err);

        res.json({ message: "Successfully deleted" });
      }
    );
  });

app.use("/api", router);

//Start the server
app.listen(port);
console.log("Magic happens on port " + port);
