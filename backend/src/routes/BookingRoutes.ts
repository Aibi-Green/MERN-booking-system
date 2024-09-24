import { Router } from 'express'
import BookingController from '../controllers/BookingController'
import { checkUserIdExists } from '../middleware/checkUserIdExists'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

router
    .route('/')
    // Get all bookings
    .get(BookingController.getBookings) // check if admin user exists
    // Create booking
    .post(checkUserIdExists, BookingController.createUserBooking)
    // Delete more than 1 booking
    .delete(BookingController.deleteManyBooking)

router
    .route('/user/:id')
    // Get All Bookings of one specific user
    .get(authenticateToken, checkUserIdExists, BookingController.getUserBookings)

// routes with ids
router
    .route('/booking/:id')
    // Get specific booking
    .get(BookingController.getOneBooking)
    // Edit a booking account
    .put(BookingController.editBooking)
    // Delete a specific booking
    .delete(BookingController.deleteBooking)

export default router