import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

// Get all user accounts
router.get('/', UserController.getUsers)

// Get specific user account
router.get('/:id', async (req: Request, res: Response) => {
    res.json({message: `get user ${req.params.id}`})
})

// Create new user account
router.post('/', UserController.createUser)

// Edit a user account
router.put('/:id', async (req: Request, res: Response) => {
    res.json({message: `Edit User ${req.params.id}`})
})

// Delete a specific user account
router.delete('/:id', async (req: Request, res: Response) => {
    res.json({message: `Delete user ${req.params.id}`})
})

export default router