const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the necessary arguments: node mongo.js <password> (<name> <number>)"
  );
  process.exit(1);
}

const [_, __, password, name, number] = process.argv;
const url = `mongodb+srv://tom:${password}@cluster0.dhphy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(url, { dbName: "phonebook" });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const addNewPerson = (name, number) => {
  if (!name || !number) {
    console.log("missing information in order to add person");
    process.exit(1);
  }
  const person = new Person({
    name,
    number,
  });
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const getInfo = () => {
  Person.find({}).then((results) => {
    console.log("phonebook:");
    results.forEach((result) => {
      console.log(`${result.name} ${result.number}`);
    });
    mongoose.connection.close();
  });
};

if (password && name && number) {
  addNewPerson(name, number);
} else {
  getInfo();
}
