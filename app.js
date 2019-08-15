const fastify = require('fastify')({logger: true});

fastify.register(require('./api/routes/auth'));
fastify.register(require('./api/routes/todo'));

//ACCESS SETTINGS
  


// ROUTES WHICH SHOULD HANDLE REQUESTS
  
// fastify.use(auth);

// fastify.get('/', function (request, reply) {
//   reply.send({ hello: 'world' })
// });




//DEFAULT ROUTE MIDDLE WARE
  



//ERROR MIDDLEWARE

module.exports = fastify;