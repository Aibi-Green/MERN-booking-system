import { Router } from 'express'
import RbookingController from '../controllers/RbookingController'

const router = Router()

router
    .route('/')
    // Get all requirement booking of all users
    .get(RbookingController.getAllRbookings)
    // Create batch requirement booking
    .post(RbookingController.createRbookings)
    // Delete batch requirement booking
    .delete(RbookingController.deleteRbookings)

router
    .route('/:id')
    // Get all requirement booking for one booking
    .get(RbookingController.getRbookings)

export default router