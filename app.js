const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const baseMiddleware = require('./middleware/base');
const routerMiddleware = require('./middleware/router');
const restMiddleware = require('./middleware/rest');
const authority = require('./middleware/authority');

// error handler
onerror(app);

// middleware
baseMiddleware(app);
authority(app);
restMiddleware(app);
routerMiddleware(app);



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
