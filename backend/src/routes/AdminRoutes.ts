import { Router } from 'express'
import AdminController from '../controllers/AdminController'

const router = Router()

// Get all admin accounts
router
    .route('/')
    .get(AdminController.getAdmins)
    .post(AdminController.createAdmin)

// routes with ids
router
    // Get specific admin account
    .route('/:id')
    .get(AdminController.getOneAdmin)
    // Edit a admin account
    .put(AdminController.editAdmin)
    // Delete a specific admin account
    .delete(AdminController.deleteAdmin)

export default router