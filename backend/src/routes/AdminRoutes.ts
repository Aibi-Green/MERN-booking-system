import { Router } from 'express'
import AdminController from '../controllers/AdminController'

const router = Router()

router
    .route('/')
    // Get all admin accounts
    .get(AdminController.getAdmins)
    // Create admin account
    .post(AdminController.createAdmin)

// routes with ids
router
    .route('/:id')
    // Get specific admin account
    .get(AdminController.getOneAdmin)
    // Edit a admin account
    .put(AdminController.editAdmin)
    // Delete a specific admin account
    .delete(AdminController.deleteAdmin)

export default router