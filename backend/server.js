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
      res.status(404).json('Valid endpoint, but requested resource could not be found.')
    );
})

app.get('/inventory/:user_id', (req,res) => {
  knex.select('*')
    .from('item')
    .where('userid',req.params.user_id)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json('Valid endpoint, but requested resource could not be found.')
    );
})

app.patch('/inventory/:itemid', function(req, res) {    
  knex('item')
    .where('item.id',req.params.itemid)
    .update({
      itemname: req.body.itemname, 
      quantity: req.body.quantity, 
      description: req.body.description
    }, ['*'])
    .catch(err =>
      res.status(404).json({
        message:'Failed to save edits, please try again.'
      })
    );
});

app.post('/inventory/new', (req,res) => {
  knex('item')
    .insert({
      userid: req.body.userid,
      itemname: req.body.itemname,
      quantity: req.body.quantity,
      description: req.body.description
    })
    .then(res.status(200).json(`Your item, ${req.body.itemname}, was successfully added.`))
    .catch(err =>
      res.status(404).json('Failed to post new item, please try again.')
    );
});

app.delete('/inventory/:itemid', function(req, res) {    
  knex('item')
    .where('item.id',req.params.itemid)
    .del()
    .then(res.status(200).json('Item successfully removed.'))
    .catch(err =>
      res.status(404).json({
        message:'Failed to delete item, please try again.'
      })
    );
});

app.post('/login/', (req,res) => {
  knex('user').select('username').where('username',req.body.username)
    .then(data => {
      if(data[0]){
        knex('user').select('password').where('password',req.body.password)
        .then(data => {
          if(data[0]){
            knex('user').select('*').where('username',req.body.username)
            .then(data => {
              res.status(200).json({attempt: 'good', loggedIn: true, firstname: data[0].firstname, lastname: data[0].lastname, username: data[0].username, id: data[0].id})
            })
          }else{
            res.status(200).json({attempt: 'Username or password invalid, please try again.'})
          }
        })   
      }else{
        res.status(200).json({attempt: 'Username or password invalid, please try again.'})
      }
    })
    .catch(err =>
      res.status(404).json({attempt:'Please enter a username and password'})
    );
})

app.post('/login/new', (req,res) => {
  
  knex('user').select('username').where('username',req.body.username)
  .then(data => {
    if(!data[0]){
      knex('user').insert({
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        username: req.body.username,
        password: req.body.password
      })
      .then(
        async function(serverResponse){
          return await knex('user').select('*').where('username',req.body.username)
        }
      )
      .then( data => {res.status(200).json({attempt: 'good', loggedIn: true, firstname: data[0].firstname, lastname: data[0].lastname, username: data[0].username, id: data[0].id})})
    }else{
      res.status(200).json({attempt: 'That username is already in use, please try again.'})
    }
  })
  .catch(err =>
    res.status(200).json({attempt:'Please fill out all forms with valid formatting.'})
  );

})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`)
})