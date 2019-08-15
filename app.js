const fastify = require('fastify')({ logger: true });

fastify.register(require('./api/routes/auth'));
fastify.register(require('./api/routes/todo'));
fastify.register(require('./api/routes/groupTodo'));

module.exports = fastify;
