import {Request, Response} from "express"
import Requirement from '../models/requirement'

const getAllRbookings = async (req: Request, res: Response) => {
    try {
        const rbookingList = await Requirement.find({}, "").exec()

        console.log("/GET ALL VENUE REQUIREMENT BOOKING");
        console.log("List consists of ", rbookingList.length, ".\n");
        
        if(rbookingList) {
            return res.status(200).json({
                status: "success",
                data: rbookingList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve Venue Requirement Booking list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const getRbookings = async (req: Request, res: Response) => {
    try {
        const rbookingList = await Requirement.find({id_booking: req.params.id}, "").exec()

        console.log("/GET ALL VENUE REQUIREMENT FOR ONE BOOKING");
        console.log("List consists of ", rbookingList.length, ".\n");
        
        if(rbookingList) {
            return res.status(200).json({
                status: "success",
                data: rbookingList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve this bookings' venue requirements list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const createRbookings = async (req: Request, res: Response) => {
    try {
        // const typeExist = await Requirement.findById(req.body.id_type).exec()

        // if(!typeExist) {
        //     return res.status(400).json({
        //         status: "fail",
        //         message: "Venue Requirement Type does not exist."
        //     })
        // }

        // let name = req.body.name
        // name = ((name.split(" ")).map((x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())).join(" ")

        // const nameExist = await Requirement.find({name: name}).exec()

        // if(nameExist.length > 0) {
        //     return res.status(400).json({
        //         status: "fail",
        //         message: "Name for Venue Requirement already exists."
        //     })
        // }

        // const newRequirement = new Requirement({id_type: req.body.id_type, name: name})
        // await newRequirement.save()

        console.log("/CREATE VENUE REQUIREMENT");
        console.log("Successfully created Venue Requirement!\n");
        
        return res.status(201).json({
            status: "success",
            message: "Created Venue Requirement successfully!",
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

const deleteRbookings = async (req: Request, res: Response) => {
    try {
        // const requirement = await Requirement.findById(req.params.id).exec()

        // if(!requirement) {
        //     return res.status(404).json({
        //         status: "fail",
        //         message: "Venue Requirement ID does not exist."
        //     })
        // }

        // await Requirement.deleteOne({_id: req.params.id})
        
        console.log("/DELETE VENUE REQUIREMENT");
        console.log("Deleted Venue Requirement ID...\n");

        return res.status(200).json({
            status: "success",
            message: "Venue Requirement ID deleted successfully!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to delete Venue Requirement ID...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

export default {
    getAllRbookings,
    getRbookings,
    createRbookings,
    deleteRbookings,
}