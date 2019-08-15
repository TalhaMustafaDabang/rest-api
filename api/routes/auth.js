const firebaseApp = require('firebase');
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyDVIK7lCgL5IFTuqZjVt8D1QzggTlDdVuQ",
//     authDomain: "rest-api-a6785.firebaseapp.com",
//     databaseURL: "https://rest-api-a6785.firebaseio.com",
//     projectId: "rest-api-a6785",
//     storageBucket: "",
//     messagingSenderId: "166628562689",
//     appId: "1:166628562689:web:af61be6f97e8c215"
// })
// import {firebaseApp} from "../../server";
// let firebaseApp = require('../../server');
async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
      return { hello: 'world' }
    }),
    fastify.post('/signup', async(request,reply)=>{
    return new Promise((res,rej)=>{

        firebaseApp.auth().createUserWithEmailAndPassword(request.body.email,request.body.password).then((response)=>{
        return res(response);
    })
    .catch(e=>{
        return rej(e);
    })
    })
    }),
    fastify.post('/login',async(request,reply)=>{
        return new Promise((res,rej)=>{   
            firebaseApp.auth().signInWithEmailAndPassword(request.body.email,request.body.password)
            .then(response=>{
                res(response);
            })
            .catch(e=>{
                rej(e);
            })
        })})

    fastify.post('/resetPassword',async(request,reply)=>{
        return new Promise((res,rej)=>{
        firebaseApp.auth().sendPasswordResetEmail(request.body.email).then((response)=>{
            return res(response);
        })
        .catch(e=>{
            return rej(e)
        })
            
        })
    }),

    fastify.post('/confirmResetPassword',async(request,reply)=>{
        return new Promise((res,rej)=>{
            firebaseApp.auth().confirmPasswordReset(request.headers.code,request.body.password).then((response)=>{
                return res(response);
            })
            .catch(e=>{
                return rej(e)
            })
        })
    })
  }
  
  module.exports = routes