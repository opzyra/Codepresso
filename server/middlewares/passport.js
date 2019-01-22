const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('../middlewares/bcrypt')

const Account = require('../models/account')
const oauthConfig = require('../config/oauth')

const oauthLogin = async (oauth, done) => {

  let platform = 0
  if(oauth.type == 'github') platform = 1
  else if(oauth.type == 'google') platform = 2
  else if(oauth.type == 'facebook') platform = 3

  const email = `${oauth.id}@${oauth.type}.com`
  let user = await Account.findOne({
    where: { email }
  })

  // Sign User
  if(!user) {
    const encoded = await bcrypt.encoded(oauth.id + oauthConfig.salt)
    const { name, avatar_url } = oauth
    user = await Account.create({email, password: encoded, oauth: oauth.type, name: !!name ? name : '', platform, avatar: avatar_url})
  } else {
    const { name, avatar_url } = oauth
    await Account.update({ name, avatar: avatar_url, access: new Date().toISOString().slice(0, 19).replace('T', ' ') }, { where: { email: user.email }})
  }

  return user 

}

passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const user = await Account.findOne({
      where: { email }
    })

    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const passCheck = bcrypt.match(password, user.password)
    if( !passCheck ){
      return done(null, false, { message : 'Wrong Password'});
    }
    //Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}))

passport.use('github', new GitHubStrategy({
  clientID: oauthConfig.federation.github.client_id,
  clientSecret: oauthConfig.federation.github.secret_id,
  callbackURL: oauthConfig.federation.github.callback_url
}, async (accessToken, refreshToken, profile, done) => {
  const authProfile = profile._json

  const user = await oauthLogin({...authProfile, type: 'github'})

  if(!user) return done(null, false, { message : 'OAuth Error'});

  return done(null, user, { message : 'Logged in Successfully'});
}))

passport.use('facebook', new FacebookStrategy({
  clientID: oauthConfig.federation.facebook.client_id,
  clientSecret: oauthConfig.federation.facebook.secret_id,
  callbackURL: oauthConfig.federation.facebook.callback_url
}, async (accessToken, refreshToken, profile, done) => {
  const authProfile = profile._json
  
  const user = await oauthLogin({...authProfile, avatar_url: authProfile.profileUrl, type: 'facebook'})

  if(!user) return done(null, false, { message : 'OAuth Error'});

  return done(null, user, { message : 'Logged in Successfully'});
}))

passport.use('google', new GoogleStrategy({
  clientID: oauthConfig.federation.google.client_id,
  clientSecret: oauthConfig.federation.google.secret_id,
  callbackURL: oauthConfig.federation.google.callback_url
}, async (accessToken, refreshToken, profile, done) => {
  const authProfile = profile._json
  const user = await oauthLogin({...authProfile, name: authProfile.displayName, avatar_url: authProfile.image.url, type: 'google'})

  if(!user) return done(null, false, { message : 'OAuth Error'});

  return done(null, user, { message : 'Logged in Successfully'});
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport