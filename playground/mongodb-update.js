const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate(
  //   { text: 'Viacheslav' },
  //   { $set: { text: 'Viacheslav Klepach' }},
  //   { returnOriginal: false })
  //   .then((result) => {
  //   console.log(result);
  // });

  db.collection('Todos').findOneAndUpdate(
    { _id: new ObjectId("5c0c09fda52fa7ea022a379f") },
    { $set: { text: 'Oksana Klepach' }},
    { returnOriginal: false })
    .then((result) => {
    console.log(result);
  });

  client.close();
});
