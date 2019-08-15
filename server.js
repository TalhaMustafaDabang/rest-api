const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});

const firebase = require('firebase');
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDVIK7lCgL5IFTuqZjVt8D1QzggTlDdVuQ',
  authDomain: 'rest-api-a6785.firebaseapp.com',
  databaseURL: 'https://rest-api-a6785.firebaseio.com',
  projectId: 'rest-api-a6785',
  storageBucket: '',
  messagingSenderId: '166628562689',
  appId: '1:166628562689:web:af61be6f97e8c215'
});
const firebaseAdmin = require('firebase-admin');
const firebaseAdminSdk = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: 'service_account',
    project_id: 'rest-api-a6785',
    private_key_id: '305b8e51f8080cfa21f70800f9fba47413ecccc7',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCIE1oZLqopvsun\nW6Fd0m/woeoQh7zlNxsm4+C5XgeRdwx1hSfCytEUbpeExEAJASAGjyIYB0qeDGhL\nBuWgy6WFGPyjjS3rUJJ9qmvgYu88f0I9zEa0FtIi8Q4GlVef3WNpaxe1QMAxlAi/\n1gwo2g4aeymLbORtniEum0crl+nWfez12hlDXacmq0BrXFmY3F00YEp2y8Kfwo2L\nx+nLp3kEufswOryATzCQSPBvArcgqZ6+Rfx4Vr6/5SyQKpWvGQcbX4DMW5AWLHIS\nDIxJjYlz3ZTs6rGuoFqqN6/MBadFuahxrlyD5V3MbeeWzx1pdTLA74Iwo8xvNCV4\nUYtC0NDHAgMBAAECggEACUg8qKQYwnE75iYne0VsEl+RHmCL/5zDMuNvhGWIIaGb\nzXZwUGbSXVDv8AQNFDAp9ZiU7EuvCNny0U9eoZnSqCIctbFfNQKRg5X49tz40cki\nhSGmnwlBe1WzLbrJN+P7sIi4HMqWcatV73QT70N0m9TT8ClU6a9UNyAreitKLbHe\n3fTrNs/QKdEMKleG1Jie0rjU8cskvMt4vmAfJZiY+UmKudT1iSAzlFOvcD/AlArD\njdC5j12ZemPB5JiDcNJR9dLXvOrbHLBwh8rMpQ1Oz6jS684VKpPQhM1dc2SBicnI\n2oj97hYtMt/hBEMRifi6JJlpiwgz5U5dsLLL5prR3QKBgQC7bL/gj7hGXkk5CGqk\nx5kXzavS8UOKRyNF76lkEuhdQdBsnbp8vM5OG4sr4z+wmWPEt19oUddWUGBX3Gh1\nPuNy8uiRA6Eh/JnQpPYTpBDHEvr1WFNT5d3KXBKq0jRIPa2CFtnGK/jmZkXuu6NY\nxZaFyUm8FHDUBRHNNTnH+LqEIwKBgQC53PMZprs5zpWCrs7v4OYT/bsK8PvHFLkw\nioSm5NN2PtwoBOeIZgjYzixFy5JrAqhl4/QZqCndMrgm8S37Xn/rl6eM7lhy/k/g\nX/vnfW8GERRo+Le46UIzRdG+IAtTnnZWnDwuLNrXXv5gNcltmJonAexfYZbfPxXG\nhVHaDr+pDQKBgAnhdtAg44caK2QNVInxV9nQZvGM9JGSpIJoWxbChGt+L726Jv2y\nenHVs+WRamcl/wN841O9lMuhGyMmpH8h3J3PvoD+nv0KsxUzzSFF8fh8wKw0htgS\nczna1sUYpdb1IXONPtfas5l55M/sJnVknUXaUb/PmA8lYUXfO3eWXkbfAoGAEY9+\nqH3IUr3iAmbhxmhJVLo0YeRC5ZxfouZzghE8qX9m7aEI/yoky9cu96k0PEgUAQx4\nk7P/wJZ6L7O51HYpP+kkO3yJftPoWBq5gjWnt7sFYqWdNitTxeRi3MPKTiw6ohRA\n21wBkTe4cP6j+Wbhqa3U124xAwbC1+7gvOmH0kECgYBeGdWhuXpZKW5tLPPsAiyn\nvNXqoxsZlu+gB3xLuoyOuNc6lV54iYtd8j+5CvfRlcOj7p9WwVggPs+pH4huEHOL\nl92SNY5A4Ptmn4BD3F1kahV60JibY/LguKvaI4S0/WnP4j8THB9w+sVGQ5e/ZFSh\nZRBXNlurp/+y7bfXm0NQBQ==\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-fdyhl@rest-api-a6785.iam.gserviceaccount.com',
    client_id: '117558185145403677067',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fdyhl%40rest-api-a6785.iam.gserviceaccount.com'
  }),
  databaseURL: 'https://rest-api-a6785.firebaseio.com'
});

(module.exports = firebaseApp), firebaseAdminSdk;
