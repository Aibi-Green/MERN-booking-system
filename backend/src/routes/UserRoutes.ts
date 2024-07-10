import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

// Get all user accounts
router
    .route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser)

// routes with ids
router
    // Get specific user account
    .route('/:id')
    .get(UserController.getOneUser)
    // Edit a user account
    .put(UserController.editUser)
    // Delete a specific user account
    .delete(UserController.deleteUser)

export default router