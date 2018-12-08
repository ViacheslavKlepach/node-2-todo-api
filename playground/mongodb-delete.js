const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({text: 'Viacheslav'}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todoes', err);
  // });

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Viacheslav'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Viacheslav'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({text: 'Viacheslav'}).then((result) => {
    console.log(result);
  });

  client.close();
});
