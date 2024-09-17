import { Router } from 'express'
import RbookingController from '../controllers/RbookingController'

const router = Router()

router
    .route('/')
    // Get all requirement booking of all users
    .get(RbookingController.getAllRbookings)
    // Create batch requirement booking
    .post(RbookingController.createRbookings)

router
    .route('/booking/:id')
    // Get all requirement booking for one booking
    .get(RbookingController.getRbookings)
    // Delete all requirements of booking
    .delete(RbookingController.deleteRbookings)

export default router