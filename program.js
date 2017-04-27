var koa = require('koa');
var app = new koa();

app.use(function *(next) {
  if (this.path === '/') {
    this.body = 'hello koa';
  } else if (this.path === '/404') {
    this.body = 'page not found';
  } else if (this.path === '/500') {
    this.body = 'internal server error';
  } else {
    return yield next;
  }
});

app.listen(process.argv[2]);
