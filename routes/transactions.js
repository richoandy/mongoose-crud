const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions')

router.get('/', transactionsController.getAllTransactions)
router.get('/due', transactionsController.getDueDateTransactions)
router.get('/:id', transactionsController.getOneTransaction)
router.post('/', transactionsController.createTransaction)
router.put('/:id', transactionsController.updateTransaction)
router.put('/return/:id', transactionsController.returnBook)
router.delete('/:id', transactionsController.deleteTransaction)

module.exports = router;
