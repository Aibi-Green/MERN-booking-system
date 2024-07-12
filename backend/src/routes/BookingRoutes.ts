import { Router } from 'express'
import BookingController from '../controllers/BookingController'

const router = Router()

router
    .route('/')
    // Get all bookings
    .get(BookingController.getBookings)
    // Create booking
    .post(BookingController.createUserBooking)
    // Delete more than 1 booking
    .delete(BookingController.deleteManyBooking)

// routes with ids
router
    .route('/:id')
    // Get specific booking
    .get(BookingController.getOneBooking)
    // Edit a booking account
    .put(BookingController.editBooking)
    // Delete a specific booking
    .delete(BookingController.deleteBooking)

// routes for user bookings
router
    .route('/user/:id')
    // Search for one user's Bookings
    .get(BookingController.getUserBookings)

export default router