const firebaseApp = require('firebase');
const firebaseAdminSdk = require('firebase-admin');
const sendNoti = require('../middlewares/sendnotifications');
async function routes(fastify, options) {

  fastify.post('/createGroup', async (request, reply) => {

      userId = await firebaseAdminSdk.auth().verifyIdToken(request.headers.token);
      userId = userId.uid;
      if (userId) {
        let group = {
          'owner': userId,
          'members': [userId],
          'taskList': [],
          'listName': request.body.name,
        };
        return new Promise((res, rej) => {
          firebaseApp.app().firestore().collection('GroupLists').add(group).then((doc) => {
              return res(doc);
            })
            .catch(e => {
              return rej(e);
            })
        })
      } else {
        return new Promise((res, rej) => {
          rej(new Error('Not Authorized'))
        })
      }
    }),


    fastify.post('/addMember', async (request, reply) => {
      userId = await firebaseAdminSdk.auth().verifyIdToken(request.headers.token);
      userId = userId.uid;
      if (userId) {
        return new Promise((res, rej) => {
          firebaseApp.app().firestore().collection('GroupLists').where("owner", "==", userId).where("name", "==", request.body.name).get()
            .then((querySanp) => {
              let group = querySanp[0].data();
              group.members.push(request.body.email);
              firebaseApp.app().firestore().collection('GroupLists').update(group).then((doc) => {
                  return res(doc);
                })
                .catch(e => {
                  return rej(e);
                })
            })
            .catch(e => {
              return rej(e);
            });
        });
      } else {
        return new Promise((res, rej) => {
          rej(new Error('Not Authorized'))
        })
      }
    }),


    fastify.get('/getList', async (request, reply) => {
      userId = await firebaseAdminSdk
        .auth()
        .verifyIdToken(request.headers.token);
      userId = userId.uid;
      if (userId) {
        return new Promise((res, rej) => {
          firebaseApp
            .app()
            .firestore()
            .collection('GroupLists')
            .where('name', '==', request.body.name)
            .get()
            .then(querySanp => {
              docs = [];
              querySanp.forEach(e => {
                if (e.data().members.indexOf(userId) != -1) {
                  docs.push(e.data());
                }
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
      } else {
        return new Promise((res, rej) => {
          rej(new Error('Not Authorized'))
        })
      }

    }),



    fastify.post('/editGroupTask', async (request, reply) => {
      userId = await firebaseAdminSdk.auth().verifyIdToken(request.headers.token);
      userId = userId.uid;

      return new Promise((res, rej) => {
        firebaseApp.app().firestore().collection('GroupLists').doc(request.body.groupId).get()
          .then((doc) => {
            data = doc.data();
            if (userId && data.members.indexOf(userId) != -1) {
              opetration = request.body.opetration;

              switch (opetration) {
                case 'add':
                  let todoObj = {
                    task: request.body.task,
                    status: request.body.status,
                    uid: userId
                  };
                  data['tasks'].push(todoObj);
                  firebaseApp
                    .app()
                    .firestore()
                    .collection('taskList')
                    .update(data)
                    .then(data => {
                      sendNoti();
                      return res({
                        message: 'added successfully'
                      });
                    })
                    .catch(e => {
                      return rej(e);
                    });
                  // });

                  break;
                case 'update':

                  break;
                case 'delete':

                  break;
              }

            } else {
              return rej(new Error('Not Authorized'))
            }

          })
          .catch(e => {
            return rej(e);
          })
      })
    });
}

module.exports = routes;
