const http  = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(3000,(err, address)=>{
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
  })