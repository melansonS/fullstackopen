require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./person");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/info", (req, res) => {
  const now = new Date();
  Person.find({}).then((results) => {
    res.send(
      `Phonebook has info for ${
        results.length
      } people\n\n${now.toDateString()} ${now.toTimeString()}`
    );
  });
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((results) => {
      res.send(results);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      console.log(result);
      if (result) {
        res.send(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "content missing" });
  }
  const newPerson = new Person(person);
  newPerson.save().then((result) => {
    res.send(newPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log("successfully removed", result);
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json("unable to remove person, person not found in db");
      }
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log("in error handler...", err.name);
  console.error(err.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
