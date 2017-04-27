const koa = require('koa');
const views = require('co-views');

const render = views(__dirname + '/views', {
  ext: 'ejs',
});

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

const app = new koa();

app.use(function* () {
  this.body = yield render('user', { user });
});

app.listen(process.argv[2]);
