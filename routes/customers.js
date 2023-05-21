const router = require("express").Router();
const { Customer, validate } = require("../db/models/customers");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const customers = await Customer.find({}).sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  if (req.params.id.length != 24) return res.status(404).send("Invalid ID");
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
      return res.status(404).send("Customer with the given ID not found...");

    return res.send(customer);
  } catch (err) {
    return res.send(err);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer(req.body);
  try {
    customer = await customer.save();
    return res.send(customer);
  } catch (err) {
    return res.status(500).send(err.errors);
  }
});

router.put("/:id", auth, async (req, res) => {
  if (req.params.id.length != 24) return res.status(404).send("Invalid ID");

  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).send("Customer not found");

    return res.send(updatedCustomer);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.params.id.length != 24) return res.status(404).send("Invalid ID");

    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).send("Customer not found");

    return res.send(deletedCustomer);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
