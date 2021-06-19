const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const authController = require('../Controller/AuthController')
const passport = require('passport')

router 
    .post('/signup', authController.createUser)
    .post('/login' , authController.login)
    .get('/logout' ,passport.authenticate('jwt' , { session:false }) , authController.logout )
    
router
   .get('/getAllUser', passport.authenticate('jwt' , { session:false }) , userController.getAllUser)
   .get('/current' , passport.authenticate('jwt' , { session:false }) , userController.current )

router.route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(  passport.authenticate('jwt' , { session:false }),  userController.updateUser)

module.exports = router