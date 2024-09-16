import {Request, Response} from "express"
import Requirement from '../models/requirement'
import Rtype from "../models/rtype";

const getRequirements = async (req: Request, res: Response) => {
    try {
        const requirementList = await Requirement.find({}, "").sort({name: 1}).exec()

        console.log("/GET ALL VENUE REQUIREMENT");
        console.log("List consists of ", requirementList.length, ".\n");
        
        if(requirementList) {
            return res.status(200).json({
                status: "success",
                data: requirementList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve Venue Requirement list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const createRequirement = async (req: Request, res: Response) => {
    try {
        const typeExist = await Rtype.findById(req.body.id_type).exec()

        if(!typeExist) {
            return res.status(400).json({
                status: "fail",
                message: "Venue Requirement Type does not exist."
            })
        }

        let name = req.body.name
        name = ((name.split(" ")).map((x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())).join(" ")

        const nameExist = await Requirement.find({name: name}).exec()

        if(nameExist.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Name for Venue Requirement already exists."
            })
        }

        const newRequirement = new Requirement({id_type: req.body.id_type, name: name})
        await newRequirement.save()

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

const editRequirement = async (req: Request, res: Response) => {
    try {
        const typeExist = await Rtype.findById(req.body.id_type).exec()        

        if(!typeExist) {
            return res.status(400).json({
                status: "fail",
                message: "Venue Requirement Type does not exist."
            })
        }

        let name = req.body.name
        name = ((name.split(" ")).map((x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())).join(" ")

        const nameExist = await Requirement.find({name: name}).exec()

        if(nameExist.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Name for Venue Requirement already exists."
            })
        }

        await Requirement.updateOne({_id: req.params.id}, {id_type: req.body.id_type, name: name})

        console.log("/UPDATE VENUE REQUIREMENT");        
        console.log("Venue Requirement Updated!\n");
        
        return res.status(200).json({
            status: "success",
            message: "Venue Requirement have been updated!",
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

const deleteRequirement = async (req: Request, res: Response) => {
    try {
        const requirement = await Requirement.findById(req.params.id).exec()

        if(!requirement) {
            return res.status(404).json({
                status: "fail",
                message: "Venue Requirement ID does not exist."
            })
        }

        await Requirement.deleteOne({_id: req.params.id})
        
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

const deleteManyRequirement = async (req: Request, res: Response) => {
    try {
        const listId = req.body.ids
        const requirement = await Requirement.find({_id: {$in: listId}}).exec()

        const requirementIds = new Set(requirement.map(el => el._id.toString()))
        const filtered = listId.filter((id: any) => !requirementIds.has(id))

        if(filtered.length > 0) {
            return res.status(404).json({
                status: "fail",
                message: "Venue Requirement ID/s does not exist.",
                error: filtered
            })
        }

        await Requirement.deleteMany({_id: {$in: listId}})

        console.log("/DELETE MANY VENUE REQUIREMENT");
        console.log("Deleted Venue Requirement IDs...\n");

        return res.status(200).json({
            status: "success",
            message: "Successfully deleted list of Venue Requirements!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to delete Venue Requirement IDs...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

export default {
    getRequirements,
    createRequirement,
    editRequirement,
    deleteRequirement,
    deleteManyRequirement
}