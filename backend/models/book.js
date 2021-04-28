const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    category:{
        type:String,
        required:[true,'Book category is required']
    },
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: false
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Book',BookSchema)