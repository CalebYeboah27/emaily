const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleClientID, googleClientSecret } = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      // authorizationURL: 'https://www.google.com/oauth2/authorize',
      // tokenURL: 'https://www.google.com/oauth2/token',
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log(accessToken, refreshToken, profile, cb);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

try {
  app.get(
    'auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
} catch (error) {
  console.log(error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
