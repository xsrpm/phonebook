const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);
const getAllPersons = () => {
  return Person.find({}).then(persons => {
    return persons;
  });
};
const getOnePerson = id => {
  return Person.findById(id).then(person => {
    return person;
  });
};

const savePerson = personObject => {
  const person = new Person({
    ...personObject,
  });

  return person.save().then(savedPerson => {
    return savedPerson;
  });
};

const deletePerson = id => {
  return Person.findByIdAndRemove(id).then(() => {});
};

const updatedPerson = (personObject, id) => {
  const person = {
    name: personObject.name,
    number: personObject.number,
  };
  return Person.findByIdAndUpdate(id, person, { new: true }).then(() => {});
};

module.exports = {
  getAllPersons,
  getOnePerson,
  savePerson,
  deletePerson,
  updatedPerson,
};
