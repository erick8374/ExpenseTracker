import express from 'express'   
import { IncomeController } from '../controllers/incomeController'

const incomeController = new IncomeController();
const router = express.Router()

router.post('/income', incomeController.create)
router.get('/incomes', incomeController.getAll) //adcionar um parametro query que pode filtrar por usuário ou/e account
router.get('/income/:id', incomeController.getById)
router.get('/income/user/:userId', incomeController.getByUser)
// router.get('/income/account/:accountID', incomeController.getByAccount)
router.put('/income/:id', incomeController.update) 
router.delete('/income/:id', incomeController.delete)

export default router
