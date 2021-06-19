const User = require('../Model/userModel')

exports.getAllUser = async (req,res,next)=>{
     
    try{
       const user = User.find({}).select('-password')
          
       const users = await user

       res.status(200).json({
          status:'Success',
          data:{
              users
          }
      })

    }catch(err){
        res.status(400).json({
            status:'Failed',
            message:err.message
        })
    }
}

exports.getUser = async(req,res)=>{
    try{
       const id = req.params.id
    const user = User.findById(id).select('-password')
          const User = await user
    res.status(200).json({
        status:'success',
        data:{
            User
        }
    })

    }catch(err){
        res.status(400).json({
            status:'failed',
             message:err.message
        })
}
}

exports.updateUser = async(req,res)=>{
try
   { 
    const user = await User.findByIdAndUpdate(req.user.id ,req.body)

      res.status(200).json({
          status:'Success',
          data:{
              user
          }
      })

}catch(err){
    res.status(400).json({
        status:'Failed',
        message:err
    })
}

}

exports.deleteUser = async(req,res)=>{
try{
  const user = await User.findByIdAndDelete(req.params.id)

  res.status(200).json({
    status:'Success! user deleted '
})
    
}
catch(err){
    res.status(200).json({
        status:'Failed '
    })
}
}

exports.current = (req,res)=>{
res.status(200).json({ 
    id :req.user.id ,
    name:req.user.name,
    email:req.user.email
})
}