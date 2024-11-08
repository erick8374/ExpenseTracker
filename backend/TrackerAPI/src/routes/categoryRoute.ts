import express from 'express'   
import { CategoryController } from '../controllers/categoryController'

const categoryController = new CategoryController();
const router = express.Router()

router.post('/category', categoryController.create)
router.get('/categories', categoryController.getAll)
router.get('/category/:id', categoryController.getById)
router.put('/category/:id', categoryController.update) 
router.delete('/category/:id', categoryController.delete)

export default router
