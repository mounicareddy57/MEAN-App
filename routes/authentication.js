const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'Please enter email'
            });
        } else {
            if (!req.body.username) {
                res.json({
                    success: false,
                    message: 'Please enter username'
                });
            } else {
                if (!req.body.password) {
                    res.json({
                        success: false,
                        message: 'Please enter password'
                    });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code == 11000) {
                                res.json({
                                    success: false,
                                    message: 'email or username already exists'
                                });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        return res.json({
                                            success: false,
                                            message: err.errors.email.message
                                        });
                                    }else{
                                        if(err.errors.username){
                                            return res.json({success: false, message:err.errors.username.message});
                                        }else{
                                            if(err.errors.password){
                                                res.json({success: false, message: err.errors.password.message});
                                            }else{
                                                res.json({success:false, message:err});
                                            }
                                        }
                                    }
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'Could not save user. Error occured: ',
                                        err
                                    });
                                }

                            }

                        } else {
                            res.json({
                                success: true,
                                message: 'User registered successfully!'
                            });
                        }
                    });
                }
            }
        }
    });
    
    router.get('/checkEmail/:email', (req,res)=>{
       if(!req.params.email){
           res.json({success: false, message: 'Email is not provided'});
       } else{
           User.findOne({email: req.params.email},(err,user)=>{
               if(err){
                   res.json({succes:false, message: err});
               }if(user){
                   res.json({success:false,message:'oops..email is already taken'})
               }else{
                   res.json({success:true, message:'good to go!!!!'})
               }
           })
       }
    });
    router.get('/checkUsername/:username', (req,res)=>{
       if(!req.params.username){
           res.json({success: false, message: 'Email is not provided'});
       } else{
           User.findOne({username: req.params.username},(err,user)=>{
               if(err){
                   res.json({succes:false, message: err});
               }if(user){
                   res.json({success:false,message:'oops..username is already taken'})
               }else{
                   res.json({success:true, message:'good to go!!!!'})
               }
           })
       }
    });
    
    router.post('/login', (req,res)=>{
        if(!req.body.username){
            res.json({success: false, message: 'Username not provided'});
        }else{
            if(!req.body.password){
                res.json({success: false, message: 'Password not provided'});
            }else{
                User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{
                   if(err){
                       res.json({success: false, message: err});
                   } else{
                       if(!user){
                           res.json({success: false, message: 'User not found'});
                       }else{
                           const validPassword = user.comparePassword(req.body.password);
                           if(!validPassword){
                               res.json({success:false, message: 'Invalid Password'});
                           }else{
                               //create a token
                               const token = jwt.sign({userId: user.id}, config.secret, {expiresIn: '24h'});
                               res.json({success:true, message: 'Success!', user: this.user, token: token, user:{username: user.username} });
                           }
                       }
                   }
                });
            }
        }     
    });
    
    //middleware is created using "use"
    router.use((req, res, next)=>{
       const token = req.headers['authorization'];
        if(!token){
            res.json({success: false, message:'No token provided'});
        }else{
            jwt.verify(token, config.secret, (err, decoded)=>{
                if(err){
                    res.json({success:false, message:'Invalid Token ' +err});
                }else{
                    req.decoded = decoded; 
                    next();
                }
            });
        }
    });
    
    
    router.get('/profile', (req,res)=>{
        User.findOne({_id: req.decoded.userId}).select('username email').exec((err,user)=>{
            if(err){
                res.json({success:false, message:err});
            }else{
                if(!user){
                    res.json({success:false, message:'User not found'});
                }else{
                    res.json({success:true, user:user});
                }
            }
        });
    });
    
    return router;
}
