const authService = require('../middlewares/jwt')
const passport = require('../middlewares/passport')
const { aes } = require('../middlewares/crypto')

const login = async (req, res, next) => {

  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        const token = authService.signToken(user.email, user.role)
        return res.json({ token });
      });     
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

const naver = passport.authenticate('naver')

const naverCallback = passport.authenticate('naver', {
  //successRedirect: '/auth/token',
  failureRedirect: '/login?er=f'
})

const github = passport.authenticate('github')

const githubCallback = passport.authenticate('github', {
  //successRedirect: '/auth/token',
  failureRedirect: '/login?er=f'
})

const facebook = passport.authenticate('facebook')

const facebookCallback = passport.authenticate('facebook', {
  //successRedirect: '/auth/token',
  failureRedirect: '/login?er=f'
})

const google = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
})

const googleCallback = passport.authenticate('google', {
  //successRedirect: '/auth/token',
  failureRedirect: '/login?er=f'
})

const token = (req, res) => {
  const user = req.user
  const token = authService.signToken(user.email, user.name, user.role)
  res.cookie('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), secure: true })
  return res.redirect(`https://codepresso.net/login?tk=ok`)
}

const sign = async (req, res, next) => {
  
}

module.exports = {
  login,
  token,
  github,
  githubCallback,
  facebook,
  facebookCallback,
  google,
  googleCallback
}