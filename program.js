var koa = require('koa');
var app = new koa();

app.use(responseTime());
app.use(upperCase());

app.use(function* () {
  this.body = 'hello koa';
});

function responseTime() {
  return function* (next) {
    // record start time
    var start = new Date;

    yield next;
    // set X-Response-Time head
    this.set('X-Response-Time', (new Date - start));
  };
}

function upperCase() {
  return function* (next) {
    // do nothing
    yield next;
    // convert this.body to upper case
    this.body = this.body.toUpperCase();
  };
}

app.listen(process.argv[2]);
