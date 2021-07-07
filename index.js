const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { request } = require('express');

let personas = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'cesar',
    number: '943928822',
    id: 5,
  },
  {
    name: 'doris',
    number: '943923523',
    id: 7,
  },
  {
    name: 'kaster',
    number: '4444444',
    id: 11,
  },
];

const app = express();

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
  response.json(personas);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = personas.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = personas.length > 0 ? Math.max(...personas.map(n => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons/', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }

  if (personas.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'The name already exists in the phonebook',
    });
  }

  const person = {
    ...body,
    id: generateId(),
  };

  personas.push(person);

  response.json(person);
});

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  body.id = id;
  console.log(body);
  personas = personas.map(persona => {
    if (persona.id !== id) return persona;
    else {
      console.log(body);
      return body;
    }
  });
  response.status(202).json(body);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  personas = personas.filter(person => person.id !== id);
  response.status(204).end();
});

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${personas.length} people</p>
        <p>${new Date(Date.now()).toString()}</p>
    `);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
