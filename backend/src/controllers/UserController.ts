import {Request, Response} from "express"
import User from '../models/user'

const getUsers = async (req: Request, res: Response) => {
    try {
        const userList = await User.find({}, "name username contact_person").exec()

        console.log("/GET ALL USER");
        console.log("List consists of ", userList.length, " users.\n");
        
        if(userList) {
            return res.status(200).json({
                status: "success",
                data: userList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve user list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const getOneUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).exec()

        console.log("/GET ONE USER");
        console.log(user ? "User ID exists!\n" : "User ID does not exist in database...\n");
        
        if(user) {
            return res.status(200).json({
                status: "success",
                message: user,
                method: "GET"
            })   
        } else {
            return res.status(404).json({
                status: "fail",
                message: "User does not exist..."
            })
        }
        
    } catch(e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve user...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()

        console.log("/CREATE USER");
        console.log("Successfully created User!\n");
        
        return res.status(201).json({
            status: "success",
            message: "User account created successfully!",
            method: "POST"
        })
    } catch (e: any) {
        if (e.name === "ValidationError") {
            let errors: {[key:string]: string} = {}
            Object.keys(e.errors).forEach((key) => {
                errors[key] = e.errors[key].message
            })
            return res.status(400).json({
                status: "fail",
                message: "Invalid payload. Please provide all required parameters...",
                error: {
                    name: e.name,
                    message: errors
                }
            })
        }
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).exec()

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "User ID does not exist."
            })
        }

        await User.updateOne({_id: req.params.id}, req.body)

        console.log("/UPDATE USER");
        console.log("User ID Updated!\n");
        
        return res.status(200).json({
            status: "success",
            message: "User details have been updated!",
            method: "PUT"
        })
    } catch (e: any) {
        if (e.name === "ValidationError") {
            let errors: {[key:string]: string} = {}
            Object.keys(e.errors).forEach((key) => {
                errors[key] = e.errors[key].message
            })
            return res.status(400).json({
                status: "fail",
                message: "Invalid payload. Please provide all required parameters...",
                error: {
                    name: e.name,
                    message: errors
                }
            })
        }
    }
}

// not yet deleting
const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).exec()

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "User ID does not exist."
            })
        }

        await User.deleteOne({_id: req.params.id})
        
        console.log("/DELETE USER");
        console.log("Deleted User ID...\n");

        return res.status(200).json({
            status: "success",
            message: "User account deleted successfully!",
            method: "DELETE"
        })  
    } catch(e: any) {
        return res.json({
            status: "fail",
            message: "Failed to delete user account...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

export default {
    getUsers,
    getOneUser,
    createUser,
    editUser,
    deleteUser
}