const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
  res.send('Home page')
})

app.get('/inventory/all', (req,res) => {
  knex.select('*')
    .from('item')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).send('Valid endpoint, but requested resource could not be found.')
    );
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`)
})