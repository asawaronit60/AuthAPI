const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../Model/userModel')

const opts = {}

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) =>{
    passport.use(new JWTStrategy(opts , (jwt_payload , done) =>{
        
        User.findById(jwt_payload.id)   
               .then(user =>{
                   if(user){
                       return done(null, user)
                   }
                   return done(null , false)
               })
               .catch(err => console.log(err))
        })
    )
}
