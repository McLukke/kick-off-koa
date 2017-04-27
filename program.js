var koa = require('koa');
var app = new koa();

app.keys = ['secret', 'keys'];

app.use(function* () {
  var times = ~~this.cookies.get('view', { signed: true }) + 1;
  this.cookies.set('view', times, { signed: true });
  this.body = `${times} views`;
});

app.listen(process.argv[2]);
