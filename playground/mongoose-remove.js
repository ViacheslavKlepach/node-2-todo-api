const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteMany({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndDelete().then
// Todo.findByIdAndRemove('5c1ea9384774bddc587fc905').then((todo) => {
//   console.log(todo);
// });

Todo.findOneAndDelete({_id: '5c1eaac34774bddc587fc991'}).then((todo) => {
  console.log(todo);
});
