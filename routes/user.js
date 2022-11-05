const express=require('express');
const router=express.Router();

const passport=require('passport');

const userController=require('../controllers/user_controller');

router.get('/profile/:id',userController.profile);
router.post('/update/:id',userController.update);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn); 


router.get('/forget-password',userController.Forgetpassword); 


// router.get('/forget-password/:id/:token',userController.ForgetPassword); 



router.post('/create',userController.create);                                                                                                                                                      
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'},),userController.createSession);



router.get('/logout', userController.destroySession);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

module.exports=router;
