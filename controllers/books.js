const book = require('../models/books')

module.exports = {
    getAllBooks : function (req, res) {
        book.find().exec()
        .then(function(books){
            res.status(200).json({
                message: "retrieve books succeed",
                books
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail to retrieve books"
            })
        })
    },

    getOneBook: function (req, res) {
        book.findById(req.params.id).exec()
        .then(function(book){
            res.status(200).json({
                message: "retrieve book suceed",
                book
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail retrieve book"
            })
        })
    },
    
    createBook : function (req, res) {
        let newBook = new book({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        })

        newBook.save((err, newBook) => {
            if (err) {
                res.status(500).json({
                    message: "fail inserting new book"
                })
            } else {
                res.status(201).json({
                    message: "insert new book succeed",
                    newBook
                })
            }
        })
    },

    updateBook : function (req, res) {
        book.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }).exec()
        .then(function(success){
            res.status(200).json({
                message: "update book succeed"
            })
        })
    },

    deleteBook : function (req, res) {
        book.findByIdAndRemove(req.params.id).exec()
        .then(function(success){
            res.status(200).json({
                message: "delete book succeed"
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail to delete book"
            })
        })
    }
}