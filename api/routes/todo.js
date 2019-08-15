const firebaseApp = require('firebase');
const firebaseAdminSdk = require('firebase-admin');

async function routes(fastify, options) {
  fastify.post('/addPersonalTask', async (request, reply) => {
      userId = await firebaseAdminSdk.auth().verifyIdToken(request.headers.token);
      userId = userId.uid;
      let todoObj = {
        task: request.body.task,
        status: request.body.status,
        uid: userId
      };

      return new Promise((res, rej) => {
        firebaseApp
          .app()
          .firestore()
          .collection('PersonalTasks')
          .add(todoObj)
          .then(data => {
            return res({
              message: 'added successfully'
            });
          })
          .catch(e => {
            return rej(e);
          });
      });
    }),
    fastify.get('/getAllPersonalTasks', async (request, reply) => {
      userId = await firebaseAdminSdk
        .auth()
        .verifyIdToken(request.headers.token);
      userId = userId.uid;
      return new Promise((res, rej) => {
        firebaseApp
          .app()
          .firestore()
          .collection('PersonalTasks')
          .where('uid', '==', userId)
          .get()
          .then(querySanp => {
            docs = [];
            querySanp.forEach(e => {
              docs.push(e.data());
            });
            console.log(docs);
            return res({
              docs: docs
            });
          })
          .catch(e => {
            return rej(e);
          });
      });
    }),
    fastify.patch('/updatePersonalTask', async (request, reply) => {
      return new Promise((res, rej) => {
        task = request.body.task;
        newTask;
        Object.entries(task).forEach(el => {
          if (el[0] != 'uid') {
            newTask[el[0]] = el[1];
          }
        });
        firebaseApp
          .app()
          .firestore()
          .collection('PersonalTask')
          .doc(request.body.taskId)
          .update(newTask)
          .then(e => {
            conosle.log(e.data());
            return res(e.data());
          })
          .catch(e => {
            return rej(e);
          });
      });
    }),
    fastify.patch('/deletePersonalTask', async (request, reply) => {
      return new Promise((res, rej) => {
        firebaseApp
          .app()
          .firestore()
          .collection('PersonalTask')
          .doc(request.body.taskId)
          .delete()
          .then(e => {
            conosle.log(e.data());
            return res(e.data());
          })
          .catch(e => {
            return rej(e);
          });
      });
    });
}

module.exports = routes;
