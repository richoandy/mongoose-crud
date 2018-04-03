const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = mongoose.Schema({
    member: { 
        type: Schema.Types.ObjectId,
        ref: "customers"
    },
    days: Number,
    out_date: Date,
    due_date: Date,
    in_date: Date,
    fine: Number,
    bookList: [{ 
        type: Schema.Types.ObjectId,
        ref: "books"
    }]
},{
    timestamps: true
})

let transaction = mongoose.model('transactions', transactionSchema)

module.exports = transaction