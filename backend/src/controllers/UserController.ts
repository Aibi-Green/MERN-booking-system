import {Request, Response} from "express"
import User from '../models/user'
import jwt from 'jsonwebtoken'

const createToken = (_id: string) => {
    return jwt.sign({_id}, process.env.SECRET_STRING as string, { expiresIn: '1d' })
}

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
        let user = {}

        if(!req.query.search) {
            console.log("ID Search");
            user = await User.find({_id: req.params.id}).exec()

            console.log("/GET ONE USER");
            console.log(Object.keys(user).length > 0 ? "User exists!\n" : "User does not exist in database...\n");
        }
        else {
            // FULL TEXT SEARCH
            // enables us to search for documents based on the text content of one or more fields.
            console.log("Full Text Search");
            const str = (req.query.search != undefined) ? req.query.search.toString() : ""
            user = await User.find({$text: {$search: str}}).exec()

            console.log("/SEARCH USER");
            console.log("Found " + Object.keys(user).length + " users!");
        }
        
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
        
    } catch (e: any) {
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

const signUpUser = async (req: Request, res: Response) => {
    try {
        // const newUser = new User(req.body)
        // await newUser.save()
        
        const user: any = await User.signup(req.body)

        const token = createToken(user._id)

        console.log("/CREATE USER");
        console.log("Successfully created User!\n");
        
        return res.status(201).json({
            status: "success",
            message: "User account created successfully!",
            token: token,
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
        } else {
            return res.status(400).json({
                status: "fail",
                message: e.message,
            })
        }
    }
}

const logInUser = async (req: Request, res: Response) => {
    try {
        console.log("LOGGIN IN!");
        
        const user: any = await User.login(req.body)
        const token = createToken(user._id)

        return res.status(201).json({
            status: "success",
            message: "User successfully logged in!",
            token: token,
            method: "POST"
        })
    } catch (e: any) {
        return res.status(400).json({
            status: "fail",
            message: e.message,
        })
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        const user = await User.changeUserDetails(req.params.id, req.body)

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
        } else {
            return res.status(400).json({
                status: "fail",
                message: e.message,
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
    signUpUser,
    logInUser,
    editUser,
    deleteUser
}