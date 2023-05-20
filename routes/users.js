const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../db/models/users");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User(req.body);
  user = await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
