
const transaction = require('../models/transactions')
const book = require('../models/books');

module.exports = {
    getAllTransactions : function (req, res) {
        transaction.find()
        .populate('bookList')
        .populate('member').exec()
        .then(function(transactions){
            res.status(200).json({
                message: "retrieve transactions succeed",
                transactions
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail to retrieve transactions"
            })
        })
    },

    getOneTransaction: function (req, res) {
        transaction.findById(req.params.id)
        .populate('bookList')
        .populate('member').exec()
        .then(function(transaction){
            res.status(200).json({
                message: "retrieve transaction suceed",
                transaction
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail retrieve transaction"
            })
        })
    },

    createTransaction : function (req, res) {
        let newTransaction = new transaction({
            member: req.body.member,
            days: req.body.days,
            out_date: new Date(),
            due_date: new Date(new Date().getTime()+((req.body.days)*24*60*60*1000)),
            in_date: new Date(new Date().getTime()+((req.body.days)*24*60*60*1000)),
            fine: 0,
            bookList: req.body.bookList
        })

        newTransaction.save((err, newTransaction) => {
            if (err) {
                res.status(500).json({
                    message: "fail inserting new transaction"
                })
            } else {
                for ( let i = 0; i<newTransaction.bookList; i++){
                    let bookId = newTransaction.bookList[i].id
                    book.findById(bookId).exec()
                    .then(function(book){
                        book.stock -= 1
                    })
                    .catch(function(err){
                        console.log("error when updating book stock")
                    })
                }
                res.status(201).json({
                    message: "insert new transaction succeed",
                    newTransaction
                })
            }
        })
    },

    updateTransaction : function (req, res) {
        let key = req.body.keys
        console.log(key);
        
        transaction.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            $push: {bookList: req.body.bookList}
        }).exec()
        .then(function(success){
            res.status(200).json({
                message: "update transaction succeed"
            })
        })
    },

    returnBook: function(req, res) {
        let transId = req.params.id
        let day = 24 * 60 * 60000
        let today = new Date()
        let returnFine = 0
        let diffDate = Math.round(today.getTime() - due_date.getTime()) / day
        if(diffDate > 0){
            returnFine = diffDate*100
        }

        transaction.findById(transId).exec()
        .then(function(transaction){
            let inDate = newDate()
            transaction.update({
                $set: {
                    in_date : inDate,
                    fine : returnFine
                }
            })
            res.status(200).json({
                message: "return book success",
                fine: returnFine
            })  
        })  
        .catch(function(err){
            res.status(500).json({
                message: "fail returning book"
            })
        })
    },

    deleteTransaction : function (req, res) {
        transaction.findByIdAndRemove(req.params.id).exec()
        .then(function(success){
            res.status(200).json({
                message: "delete transaction succeed"
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail to delete transaction"
            })
        })
    },

    getDueDateTransactions : function (req, res) {
        transaction.find({
            
        }).exec()
        .then(function(transactions){
            res.status(200).json({
                message: transactions
            })
        })
    }
}