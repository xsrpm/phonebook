const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true, unique: true },
  number: { type: String, minLength: 8, required: true }
})
personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
const getAllPersons = () => {
  return Person.find({}).then(persons => {
    return persons
  })
}

const getPersonInfo = () => {
  return Person.find({}).then(persons => {
    return `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date(Date.now()).toString()}</p>`
  })
}

const getOnePerson = id => {
  return Person.findById(id).then(person => {
    return person
  })
}

const savePerson = personObject => {
  const person = new Person({
    ...personObject
  })

  return person.save().then(savedPerson => {
    return savedPerson
  })
}

const deletePerson = id => {
  return Person.findByIdAndRemove(id).then(() => {})
}

const updatedPerson = (personObject, id) => {
  const person = {
    name: personObject.name,
    number: personObject.number
  }
  return Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true
  }).then(() => {})
}

module.exports = {
  getAllPersons,
  getOnePerson,
  savePerson,
  deletePerson,
  updatedPerson,
  getPersonInfo
}
