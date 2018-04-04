const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
    isbn: {
        type: String,
        required: [true, 'isbn cannot be empty']
    },
    title: {
        type: String,
        required: [true, 'title cannot be empty']
    },
    author: {
        type: String,
        required: [true, 'author cannot be empty']
    },
    category: {
        type: String,
        required: [true, 'category cannot be empty']
    },
    stock: {
        type: Number,
        required: [true, 'stock cannot be empty']
    }
},{
    timestamps: true
})

let book = mongoose.model('books', bookSchema)

module.exports = book