const firebaseApp = require('firebase');
const firebaseAdminSdk = require('firebase-admin');
async function routes (fastify, options) {
    // fastify.get('/', async (request, reply) => {
    //   return { hello: 'world' }
    // })

    fastify.post('/userTodo',async(request,reply)=>{
        const todoObj = {
            task: request.body.task,
        }
        todoObj['uid']=await firebaseAdminSdk.auth().verifyIdToken(request.headers.token);
        todoObj['uid']=todoObj['uid'].uid;

        // firebaseAdminSdk.auth().verifyIdToken(request.headers.token).then((cred)=>{
        //     todoObj['uid'] = cred.uid;
        // })
                return new Promise((res,rej)=>{
                    res(todoObj);
                })
        
        // console.log(ta)
        // firebase.app().firestore().collection('userTodo').add()
    })
    
  }
  
  module.exports = routes