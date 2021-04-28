const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User=  mongoose.model("User")
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../Keys')
const requireLogin = require('../middleware/requireLogin')



router.post('/register',(req,res)=>{
    const {name,email,password}  =req.body
    if(!name || !email || !password)
    {
       return res.status(402).json({error:"Please fill up all fields.."})
    }
    
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser)
        {
            return res.status(202).json({error:"user already exists.."})
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new User({
                name,
                email,
                password: hashedpassword
                
                  })
            user.save()
                .then(user=>{
                res.json({message:"register successfully!!"})
            })
                .catch(err=>{
                    console.log(err)
                })
        })
   
})
})

router.post('/login',(req,res)=>{
    const {email,password} =req.body

    if(!email || !password){
      return  res.json({error:"please enter valid email or passward"})
    }
    User.findOne({email:email}) //email checking
        .then(savedUser=>{
            if(!savedUser){
                return res.json({error:"Invalid email or passwaord"})
            }
   
            
        bcrypt.compare(password,savedUser.password) //password checking
                .then(doMatch=>{
                    if(doMatch)
                    {
                        // res.json({message:"signin successfully"})
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,name,email} = savedUser
                        res.json({token,user:{_id,name,email}})
                    }
                    else{
                       return res.status(410).json({error:"Invalid email or password"})
                    } 
                })
                .catch(err=>{
                    console.log(err);  //if error generated from devlopment side or databsae side
                })
            })
    
})

router.put('/update',requireLogin,async(req,res)=>{
    // res.send('update route')
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password || user.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            token: generateToken(updatedUser._id)
        })
    }
})

router.delete('/:id',(req,res)=>{
    res.send('delete route')
})

router.get('/',requireLogin,async(req,res)=>{
    res.send('fetch route')
    const users = await User.find({})
    if(users){
        res.json(users);
    }else{
        res.json({error:"No users found"})
    }
})

router.get('/profile',async(req,res)=>{
    // console.log("request",req)
    try{
        const user = await User.findById(req.id)
        if(!user){
        res.json({error:"User don't have profile yet"})
        }
        res.send(user)
    }catch(error){
        console.log(error)
    }
})


module.exports = router