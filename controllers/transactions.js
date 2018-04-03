
const transaction = require('../models/transactions')

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
            out_date: req.body.outDate,
            due_date: req.body.dueDate,
            in_date: req.body.inDate,
            fine: req.body.fine,
            bookList: req.body.bookList
        })

        newTransaction.save((err, newTransaction) => {
            if (err) {
                res.status(500).json({
                    message: "fail inserting new transaction"
                })
            } else {
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
    }
}