const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = mongoose.Schema({
    member: { 
        type: Schema.Types.ObjectId,
        ref: "customers"
    },
    days: {
        type: Number,
        required: true
    },
    out_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    in_date: {
        type: Date,
    },
    fine: {
        type: Number,
    },
    bookList: [{ 
        type: Schema.Types.ObjectId,
        ref: "books",
        required: true,
    }]
},{
    timestamps: true
})

let transaction = mongoose.model('transactions', transactionSchema)

module.exports = transaction