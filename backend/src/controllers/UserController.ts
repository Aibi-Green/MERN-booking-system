import {Request, Response} from "express"
import User from '../models/user'

const getUsers = async (req: Request, res: Response) => {
    try {
        const userList = await User.find({})

        if(userList) {
            return res.json({
                status: "success",
                data: userList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve user list"
        })
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        return res.json({data: req.body})
    } catch (e: any) {
        if (e.name === "ValidationError") {
            let errors: {[key:string]: string} = {}
            Object.keys(e.errors).forEach((key) => {
                errors[key] = e.errors[key].message
            })
            return res.status(400).json({
                status: "fail",
                message: errors
            })
        }
    }
}

export default {
    getUsers,
    createUser
}