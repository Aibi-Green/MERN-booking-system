import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router
    .route('/')
    // Get all user accounts
    .get(UserController.getUsers)
    // Create user account
    .post(UserController.createUser)

// routes with ids
router
    .route('/:id')
    // Get specific user account by ID or by searching all fields
    .get(UserController.getOneUser)
    // Edit a user account
    .put(UserController.editUser)
    // Delete a specific user account
    .delete(UserController.deleteUser)

export default router