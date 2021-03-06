'use strict';
const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({text: ''})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
      }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
        .end(done);
  });
  it('should return 404 if todo not found', (done) => {
    request(app)
      .get('/todos/4c17bbd694d6be26103cca0f')
      .expect(404)
      .end(done);
  });
  it('should return 404 if id is not valid', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  })
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({_id: hexId}).then((todo) => {
          expect(todo.length).toBe(0);
          done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete('/todos/4c17bbd694d6be26103cca0f')
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
      let hexId = todos[0]._id.toHexString();
      let text = "Updated text";

      request(app)
        .patch(`/todos/${hexId}`)
        .send({text: text})
        .send({completed: true})
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
      });
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString();
    let text = "Updated text";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text: text})
      .send({completed: false})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
    });
  });
});
