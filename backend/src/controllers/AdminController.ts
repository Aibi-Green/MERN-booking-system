import {Request, Response} from "express"
import Admin from '../models/admin'

const getAdmins = async (req: Request, res: Response) => {
    try {
        const adminList = await Admin.find({}, "name username contact_person")

        console.log("/GET ALL ADMIN");
        console.log("List consists of ", adminList.length, ".\n");
        
        if(adminList) {
            return res.status(200).json({
                status: "success",
                data: adminList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve admin list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const getOneAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findById(req.params.id)

        console.log("/GET ONE ADMIN");
        console.log(admin ? "Admin ID exists!\n" : "Admin ID does not exist in database...\n");
        
        if(admin) {
            return res.status(200).json({
                status: "success",
                message: admin,
                method: "GET"
            })   
        } else {
            return res.status(404).json({
                status: "fail",
                message: "Admin does not exist..."
            })
        }
        
    } catch(e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve admin...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const createAdmin = async (req: Request, res: Response) => {
    try {
        const newAdmin = new Admin(req.body)
        await newAdmin.save()

        console.log("/CREATE ADMIN");
        console.log("Successfully created Admin!\n");
        
        return res.status(201).json({
            status: "success",
            message: "Admin account created successfully!",
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

const editAdmin = async (req: Request, res: Response) => {
    try {
        await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        console.log("/UPDATE ADMIN");
        console.log("Admin ID Updated!\n");
        
        return res.status(200).json({
            status: "success",
            message: "Admin details have been updated!",
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
const deleteAdmin = async (req: Request, res: Response) => {
    try {
        await Admin.findByIdAndDelete(req.params.id)
        
        console.log("/DELETE ADMIN");
        console.log("Deleted Admin ID...\n");

        return res.status(200).json({
            status: "success",
            message: "Admin account deleted successfully!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid payload. Please provide all required parameters...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

export default {
    getAdmins,
    getOneAdmin,
    createAdmin,
    editAdmin,
    deleteAdmin
}