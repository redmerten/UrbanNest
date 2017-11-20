/**
 * Created by CameronMerten on 10/3/17.
 */
const passport = require('passport')

//when user goes to route below, passport will take over and attempt to authenticate
//need to use 'google' bc GoogleStrategy already knows the name
//scope tells google to give us profile and email.  Many other scopes are avail too
//export so app defined in index.js can call
module.exports = app=> {
  //-------GOOGLE----------------
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
  )

  /*
//this handle the callback when google sends response back
  app.get(
    '/auth/google/callback',
    passport.authenticate('google')),
    (req, res) => {
    res.redirect('/')
    }
*/

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/auth/google"
    })
  )

  //to logout  kill cookie
  //to see cookie, set dev console to look at network then look at
  app.get('/api/logout', (req, res)=>{
    req.logout()
    //res.send(req.user) //response will be empty because there is no longer a user
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res)=>{
    res.send(req.user)
    //to see the session res.send(req.session) //this returns passport:{user: 'mongoidstring'}
  })


  //----------FACEBOOK----------------
  app.get('/auth/facebook', passport.authenticate('facebook', {
      scope: ['profile', 'email']
    })
  )
//this handle the callback when google sends response back
  app.get('/auth/facebook/callback', passport.authenticate('facebook'))

}