import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router
    .route('/')
    // Get all user accounts
    .get(UserController.getUsers)

// routes with ids
router
    .route('/profile')
    // Get specific user account by ID or by searching all fields
    .get(UserController.getOneUser)
    // Edit a user account
    .put(UserController.editUser)
    // Delete a specific user account
    .delete(UserController.deleteUser)

router
    .route('/signup')
    // Create user account
    .post(UserController.signUpUser)

    router
    .route('/login')
    // Create user account
    .post(UserController.logInUser)

export default router