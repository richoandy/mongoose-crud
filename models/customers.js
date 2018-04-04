const mongoose = require('mongoose')

let customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    memberId: {
        type: String,
        required: [true, 'memberId cannot be empty']
    },
    address: {
        type: String,
        required: [true, 'address cannot be empty']
    },
    zipCode: { 
        type: String,
        required: [true, 'zipCode cannot be empty']
    },
    phone: {
        type: String,
        required: [true, 'phone cannot be empty']
    }
},{
    timestamps: true
})

let customer = mongoose.model('customers', customerSchema)

module.exports = customer