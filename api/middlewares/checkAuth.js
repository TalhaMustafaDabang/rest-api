const firebaseApp = require('firebase');
const firebaseAdminSdk = require('firebase-admin');

const verifyToken = async (token) => {
  return new Promise((res, rej) => {
    firebaseAdminSdk.auth().verifyIdToken(token).then((cred) => {
        return res(true);
      })
      .catch(e => {
        return rej(false);
      })

  })
}
