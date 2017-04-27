var koa = require('koa');
var parse = require('co-body');
var session = require('koa-session');

var form = '<form action="/login" method="POST">\
  <input name="username" type="text" value="username">\
  <input name="password" type="password" placeholder="The password is \'password\'">\
  <button type="submit">Submit</button>\
</form>';

var app = new koa();

// use koa-session somewhere at the top of the app
// we need to set the `.keys` for signed cookies and the cookie-session module
app.keys = ['secret1', 'secret2', 'secret3'];
app.use(session(app));

/**
 * If `this.session.authenticated` exist, user will see 'hello world'
 * otherwise, people will get a `401` error  because they aren't logged in
 */

app.use(function* home(next) {
  if (this.request.path !== '/') return yield next;

  const authenticated = !!this.session.authenticated;
  if (authenticated) {
    this.body = 'hello world';
  } else {
    this.status = 401;
    this.body = 'please login';
  }
});

/**
 * If successful, the logged in user should be redirected to `/`.
 * hint: use `this.redirect`
 */

app.use(function* login(next) {
  if (this.request.path !== '/login') return yield next;
  if (this.request.method === 'GET') return this.body = form;

  if (this.request.method === 'POST') {
    const body = yield parse(this);
    const username = body.username;
    const password = body.password;
    if (username === 'username' && password === 'password') {
      this.session.authenticated = true;
      this.redirect('/');
    } else {
      this.status = 400;
    }
  }
});

/**
 * Let's redirect to `/login` after every response.
 * If a user hits `/logout` when they're already logged out,
 * let's not consider that an error and rather a "success".
 */

app.use(function* logout(next) {
  if (this.request.path !== '/logout') return yield next;

  this.session.authenticated = false;
  this.redirect('/login');
});

app.listen(process.argv[2]);
