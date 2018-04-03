const customer = require('../models/customers')

module.exports = {
    getAllCustomers : function (req, res) {
        customer.find().exec()
        .then(function(customers){
            res.status(200).json({
                message: "retrieve customers succeed",
                customers
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail to retrieve customers"
            })
        })
    },

    getOneCustomer: function (req, res) {
        customer.findById(req.params.id).exec()
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

    createCustomer : function (req, res) {
        let newCustomer = new customer({
            name: req.body.name,
            memberId: req.body.memberId,
            address: req.body.address,
            zipCode: req.body.zipCode,
            phone: req.body.phone,
        })

        newCustomer.save((err, newCustomer) => {
            if (err) {
                res.status(500).json({
                    message: "fail inserting new customer"
                })
            } else {
                res.status(201).json({
                    message: "insert new customer succeed",
                    newCustomer
                })
            }
        })
    },

    updateCustomer : function (req, res) {
        customer.findByIdAndUpdate(req.params.id, {
           $set: req.body
        }).exec()
        .then(function(success){
            res.status(200).json({
                message: "update customer succeed"
            })
        })
    },

    deleteCustomer : function (req, res) {
        customer.findByIdAndRemove(req.params.id).exec()
        .then(function(success){
            res.status(200).json({
                message: "delete customer succeed"
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: "fail to delete customer"
            })
        })
    }
}