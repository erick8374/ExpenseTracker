import express from 'express'   
import { HealthController } from '../controllers/healthController'

const healthController = new HealthController();
const router = express.Router()

router.get('/healthcheck', healthController.get)

export default router
