const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../db/models/users");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(request) {
  const schema = Joi.object({
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(request);
}

module.exports = router;
