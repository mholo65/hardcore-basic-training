const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const faker = require("faker");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const { DateTime } = require("luxon");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const createPerson = () => ({
  get age() {
    const d = DateTime.fromJSDate(this.birthday);
    return Math.abs(d.diffNow("years").get("years"));
  },
  id: uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthday: faker.date.past(70, "1999-01-01"),
  gender: faker.random.boolean() ? "m" : "f",
  email: faker.internet.email()
  // gravatar: faker.internet.gravatar()
});

let persons = Array(200)
  .fill({})
  .map(createPerson);

// GET ALL
app.get("/persons", (req, res) => {
  res.json(persons);
});

// POST
app.post("/persons", (req, res) => {
  const newPerson = {
    ...req.body,
    birthday: new Date(req.body.birthday),
    id: uuid()
  };
  persons = persons.concat([newPerson]);
  res.json({ success: true });
});

// DELETE
app.delete("/persons/:id", (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

app.listen(parseInt(process.env.PORT, 10) || 8889, () => {
  console.log("Listening!");
});
