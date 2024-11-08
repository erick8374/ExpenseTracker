import express from 'express'   
import { ExpenseController } from '../controllers/expenseController'

const expenseController = new ExpenseController();
const router = express.Router()

router.post('/expense', expenseController.create)
router.get('/expenses', expenseController.getAll) //adcionar um parametro query que pode filtrar por usuário ou/e categoria
router.get('/expense/:id', expenseController.getById)
router.get('/expense/user/:userId', expenseController.getByUser)
router.get('/expenses/category/:categoryId', expenseController.getByCategory)
router.put('/expense/:id', expenseController.update)
router.delete('/expense/:id', expenseController.delete)

export default router
 