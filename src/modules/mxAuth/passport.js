import passport from 'passport';

server.use(passport.initialize());
server.use(passport.session());
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy((username, password, done) => {
  const user = db.get('SELECT * FROM users WHERE username = ? AND password = ?',
   username, password);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
}));
