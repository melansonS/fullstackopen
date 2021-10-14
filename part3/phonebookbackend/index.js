const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/info", (req, res) => {
  const now = new Date();

  res.send(
    `Phonebook has info for ${
      persons.length
    } people\n\n${now.toDateString()} ${now.toTimeString()}`
  );
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({
      error: "person not found",
    });
  }
  res.send(persons);
});

app.post("/api/persons", (req, res) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
    id: Math.random() * 10000,
  };

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "content missing" });
  }
  if (persons.find((p) => p.name === req.body.name)) {
    return res.status(400).json({ error: "name already in use" });
  }
  persons.push(person);
  res.send(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
