const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    blogDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    userId:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Blog',blogSchema)