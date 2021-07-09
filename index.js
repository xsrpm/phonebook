const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const {
  getAllPersons,
  getOnePerson,
  savePerson,
  deletePerson,
  updatedPerson,
  getPersonInfo,
} = require('./models/person');

const app = express();
app.use(express.static('build'));
app.use(cors());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
  getAllPersons().then(personas => {
    response.json(personas);
  });
});

app.get('/api/info', (request, response) => {
  getPersonInfo().then(res => {
    response.send(res);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  getOnePerson(request.params.id)
    .then(person => {
      if (person) {
        response.status(202).json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons/', (request, response, next) => {
  const body = request.body;
  savePerson(body)
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  updatedPerson(body, request.params.id)
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  deletePerson(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
