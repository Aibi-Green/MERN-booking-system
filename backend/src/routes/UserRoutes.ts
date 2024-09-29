import { Router } from 'express'
import UserController from '../controllers/UserController'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

router
    .route('/')
    // Get all user accounts
    .get(UserController.getUsers)

router
    .route('/profile')
    // Get specific user account
    .get(authenticateToken, UserController.getOneUser)
    // Edit a user account
    .put(authenticateToken, UserController.editUser)
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