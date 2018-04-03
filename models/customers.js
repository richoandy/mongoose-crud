const mongoose = require('mongoose')

let customerSchema = mongoose.Schema({
    name: String,
    memberId: String,
    address: String,
    zipCode: String,
    phone: String
},{
    timestamps: true
})

let customer = mongoose.model('customers', customerSchema)

module.exports = customer