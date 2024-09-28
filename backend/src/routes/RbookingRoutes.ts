import { Router } from 'express'
import RbookingController from '../controllers/RbookingController'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

router
    .route('/')
    // Get all requirement booking of all users
    .get(RbookingController.getAllRbookings)    

router
    .route('/booking/:id_booking')
    // Get all requirement booking for one booking
    .get(authenticateToken, RbookingController.getRbookings)
    // Create batch requirement booking
    .post(authenticateToken, RbookingController.createRbookings)
    // Delete all requirements of booking
    .delete(authenticateToken, RbookingController.deleteRbookings)

export default router