const koa = require('koa');
const session = require('koa-session');

const app = new koa();
app.keys = ['secret', 'keys'];

app.use(session(app));

app.use(function* () {
  const times = ~~this.session.views + 1;
  this.session.views = times;
  this.body = `${times} views`;
});

app.listen(process.argv[2]);
