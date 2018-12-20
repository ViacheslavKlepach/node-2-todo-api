let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose.js')
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const {ObjectId} = require('mongodb');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos: todos,
    code: 'fsf'});
  }, (e) => {
    res.status(400).send(e);
  })
});

//GET /todos/1234
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  // res.send(req.params);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo: todo});
  }).catch((e) => res.status(400).send());
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app: app};
