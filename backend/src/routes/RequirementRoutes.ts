import { Router } from 'express'
import RequirementController from '../controllers/RequirementController'

const router = Router()

router
    .route('/')
    // Get all requirement
    .get(RequirementController.getRequirements)
    // Create requirement
    .post(RequirementController.createRequirement)
    // Delete more than 1 requirement
    .delete(RequirementController.deleteManyRequirement)

// routes with ids
router
    .route('/:id')
    // Edit a requirement
    .put(RequirementController.editRequirement)
    // Delete a specific requirement
    .delete(RequirementController.deleteRequirement)

export default router