import { Router } from 'express'
import RtypesController from '../controllers/RtypeController'

const router = Router()

router
    .route('/')
    // Get all requirement types
    .get(RtypesController.getRtypes)
    // Create requirement type
    .post(RtypesController.createRtype)
    // Delete more than 1 requirement type
    .delete(RtypesController.deleteManyRtype)

// routes with ids
router
    .route('/:id')
    // Edit a requirement type
    .put(RtypesController.editRtype)
    // Delete a specific requirement type
    .delete(RtypesController.deleteRtype)

export default router