const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')

const signInToken = (id)=>{
   return jwt.sign({id:id} , process.env.JWT_SECRET ,{  
        expiresIn:process.env.JWT_EXPIRES_IN
   })

}


const createSendToken = (user,statusCode , res)=>{
      
    const token = signInToken(user._id );
   
    const cookieOptions =  {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 *60 *60 *1000),
        httpOnly: true
 }
    
 res.cookie('jwt' , token, cookieOptions)
 
 res.status(statusCode).json({
    status:'success',
    token,
    data:{
        user
    }

})
}


///sign up 
exports.createUser = async(req,res,next)=>{

    try {
        const newUser = await User.create(req.body)
        
        createSendToken(newUser , 200 , res)
        
    }catch(err){
        res.status(400).json({
            status:'Failed',
            message:err.message
        })
    }
    
    }



////login user
exports.login = async(req, res ,next)=>{
   
           const {email , password} = req.body
        
         const user =  User.findOne({email:email})
               .then(user =>{
                if( !user )
                return next(new Error('no user found with this email id'))
                 
                if(! user.correctPassword( password, user.password )) {
                    return next(new Error('Incorrect password!'))
                  }
                     
                  createSendToken(user,200,res)
            })
            .catch(err =>{
                res.status(400).json({
                    status:'fail',
                    message:err.message
                })
            })    
    
}

exports.logout  = async (req,res)=>{
     res.clearCookie('jwt');
    res.status(200).json({
        status:'success'
    })
}