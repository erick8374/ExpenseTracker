import express from 'express'   
import { AccountController } from '../controllers/accountController'

const accountController = new AccountController();
const router = express.Router()

router.post('/account', accountController.create)
router.get('/accounts', accountController.getAll)
router.get('/account/:id', accountController.getById)
router.get('/account/user/:userId', accountController.getByUser)
router.put('/account/:id', accountController.update)
router.delete('/account/:id', accountController.delete)

export default router
