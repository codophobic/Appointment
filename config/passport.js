const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const UserModel = mongoose.model("users");
const keys = require("../config/key");

const options={};
options.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey= keys.secretOrKey;

module.exports= passport=>{
    passport.use(
        new JwtStrategy(options,(jwtpayload,done)=>{
            UserModel.findById(jwtpayload.id).then(user=>
                {
                    if(user)
                    return done(null,user);
                    else
                    return done(null,false);
                }).catch(err=>console.log(err));
        })
    );
};