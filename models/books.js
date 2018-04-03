const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    category: String,
    stock: Number
},{
    timestamps: true
})

let book = mongoose.model('books', bookSchema)

module.exports = book