import express from 'express'   
import { TransactionController } from '../controllers/transactionController'

const transactionController = new TransactionController();
const router = express.Router()

router.get('/transactions', transactionController.getAll)
router.get('/transaction/:id', transactionController.getById)
router.get('/transactions/category/:categoryId', transactionController.getByCategory)
router.post('/transaction', transactionController.create)
router.put('/transaction/:id', transactionController.update)
router.delete('/transaction/:id', transactionController.delete)

export default router
 