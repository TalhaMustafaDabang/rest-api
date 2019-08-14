const http  = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

server = http.createServer(app);
server.listen(port,()=>{
    console.log(`Server Listing On Port ${port}`);
})