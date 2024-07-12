import {Request, Response} from "express"
import Rtype from '../models/rtype'
import Requirement from "../models/requirement";

const getRtypes = async (req: Request, res: Response) => {
    try {
        const rtypesList = await Rtype.find({}, "").exec()

        console.log("/GET ALL VENUE REQUIREMENT TYPES");
        console.log("List consists of ", rtypesList.length, ".\n");
        
        if(rtypesList) {
            return res.status(200).json({
                status: "success",
                data: rtypesList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve Venue Requirement Types list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const createRtype = async (req: Request, res: Response) => {
    try {
        let name = req.body.name
        name = ((name.split(" ")).map((x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())).join(" ")
        
        const result = await Rtype.find({name: name}).exec()

        if(result.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Name for Venue Requirement Type already exists."
            })
        }

        const newRtype = new Rtype({name: name})
        await newRtype.save()

        console.log("/CREATE VENUE REQUIREMENT TYPE");
        console.log("Successfully created Venue Requirement Type!\n");
        
        return res.status(201).json({
            status: "success",
            message: "Created Venue Requirement Type successfully!",
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

const editRtype = async (req: Request, res: Response) => {
    try {
        let name = req.body.name
        name = ((name.split(" ")).map((x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())).join(" ")
        
        const result = await Rtype.find({name: name}).exec()

        if(result.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Name for Venue Requirement Type already exists."
            })
        }

        await Rtype.updateOne({_id: req.params.id}, {name: name})

        console.log("/UPDATE VENUE REQUIREMENT TYPE");        
        console.log("Venue Requirement Type Updated!\n");
        
        return res.status(200).json({
            status: "success",
            message: "Venue Requirement Type have been updated!",
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

const deleteRtype = async (req: Request, res: Response) => {
    try {
        const rUnderType = await Requirement.find({id_type: req.params.id}).exec()        

        if(rUnderType.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Venue Requirement Type still has requirements under it."
            })
        }

        const rtype = await Rtype.findById(req.params.id).exec()

        if(!rtype) {
            return res.status(400).json({
                status: "fail",
                message: "Venue Requirement Type ID does not exist."
            })
        }

        await Rtype.deleteOne({_id: req.params.id})
        
        console.log("/DELETE VENUE REQUIREMENT TYPE");
        console.log("Deleted Venue Requirement Type ID...\n");

        return res.status(200).json({
            status: "success",
            message: "Venue Requirement Type ID deleted successfully!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to delete Venue Requirement Type ID...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const deleteManyRtype = async (req: Request, res: Response) => {
    try {
        const listId = req.body.ids
        const rtype = await Rtype.find({_id: {$in: listId}}).exec()

        const rtypeIds = new Set(rtype.map(el => el._id.toString()))
        const filtered = listId.filter((id: any) => !rtypeIds.has(id))

        if(filtered.length > 0) {
            return res.status(404).json({
                status: "fail",
                message: "Venue Requirement Type ID/s does not exist.",
                error: filtered
            })
        }

        const rUnderType = await Requirement.find({id_type: {$in: req.body.idList}}).exec()        

        if(rUnderType.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Some Venue Requirement Type still has requirements under it."
            })
        }

        await Rtype.deleteMany({_id: {$in: listId}})

        console.log("/DELETE MANY VENUE REQUIREMENT TYPE");
        console.log("Deleted Venue Requirement Type IDs...\n");

        return res.status(200).json({
            status: "success",
            message: "Successfully deleted list of Venue Requirement Types!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to delete Venue Requirement Type IDs...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

export default {
    getRtypes,
    createRtype,
    editRtype,
    deleteRtype,
    deleteManyRtype
}