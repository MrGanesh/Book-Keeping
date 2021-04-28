const express = require('express') 
const mongoose = require('mongoose')
const Book=  mongoose.model("Book")
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')

router.post('/api/book-creation',(req,res)=>{
    const {category,author,title,createdBy} = req.body
    
    const book = new Book({
        category,
        author,
        title,
        createdBy
       
    })
    book.save().then(savedbook=>{
        if(savedbook){
            res.status(200).json({savedbook,message:"book created successfully"})
        }
        else{
            return res.status(404).json({error:"book creation failed"})
        }
    })


})

router.get('/api/book-fetch',async(req,res)=>{
     Book.find({}).then(book=>{
        if(book){
            res.status(200).json({book,message:"book found successfully"})
        }else{
            res.status(404).json({error:"There are no books found"})
        }
    }) .catch(err=>{
        console.log(err)
    })
   
})

router.put('/:id',requireLogin,async(req,res)=>{
    // res.send(req.params.id)
    const book = await Book.findById(req.params.id)
    if(book){
        const updatebook = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({updatebook,message:"book is updated.."})
    }else{
        return res.status(404).json({error:"updation failed"})
    }
})

router.delete('/delete-book/:id',requireLogin,async(req,res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({book,message:"book deleted successfully"})
    }catch{
            return res.status(404).json({error:"deletion failed"})
    }
})

module.exports = router