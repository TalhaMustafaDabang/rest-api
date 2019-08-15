const firebaseApp = require('firebase');
const firebaseAdminSdk = require('firebase-admin');

const sendNotification = (userIds) => {
  tokens = [];
  userIds.forEach(element => {
    firebaseApp.app().firestore().collection('users').doc(element).get().then(doc => {
      doc.data().fcmToken ? tokens.push(doc.data().fcmToken) : () => {};

    })
  });
  let payload = {
    webpush: {
      notification: {
        title: "Test",
        body: "List updated",
        color: '#232323',
        priority: "high",
        requireInteraction: "true",
        click_action: "www.cooperative.com",
      },
    },
    data: {
      app_route: obj.app_route,
      click_action: obj.app_route,
      soundname: "default",
      message: "List updated",
    }
  };
  tokens.forEach(token => {
    payload["token"] = token;
    firebaseAdminSdk.messaging().send(payload).then((response) => {
      if (response.failed) {
        console.log("error in response");
      }else{
        console.log("notification sended")
      }
    })
  });
}


module.exports = sendNotification;
