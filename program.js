var koa = require('koa');
var app = new koa();

app.use(function *(next){
  console.log(this.request.is());
  if (this.request.is() === 'application/json') {
    this.body = { message: 'hi!' };
  } else {
    this.body = 'ok';
  }
});

app.listen(process.argv[2]);
