import {Request, Response} from "express"
import User from '../models/user'
import Booking from '../models/booking'

const getBookings = async (req: Request, res: Response) => {
    try {
        const bookingList = await Booking.find({}, "").exec()

        console.log("/GET ALL BOOKING");
        console.log("List consists of ", bookingList.length, ".\n");
        
        if(bookingList) {
            return res.status(200).json({
                status: "success",
                data: bookingList,
                method: "GET"
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve booking list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const getOneBooking = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id).exec()

        console.log("/GET ONE BOOKING");
        console.log(booking ? "Booking ID exists!\n" : "Booking ID does not exist in database...\n");
        
        if(booking) {
            return res.status(200).json({
                status: "success",
                message: booking,
                method: "GET"
            })   
        } else {
            return res.status(404).json({
                status: "fail",
                message: "Booking does not exist..."
            })
        }
        
    } catch(e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve booking...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const getUserBookings = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).exec()

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "User ID does not exist."
            })
        }

        const bookingList = await Booking.find({id_user: req.params.id}, "").exec()

        console.log("/GET ALL BOOKING OF ONE USER");
        console.log("List consists of ", bookingList.length, " bookings.\n");
        
        if(bookingList) {
            return res.status(200).json({
                status: "success",
                data: bookingList,
                method: "GET"
            })
        }

    } catch (e: any) {
        return res.status(500).json({
            status: "fail",
            message: "Failed to retrieve user's booking list...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const createUserBooking = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.body.id_user).exec()

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "User ID does not exist. Booking cancelled."
            })
        }

        const newBooking = new Booking(req.body)
        await newBooking.save()

        console.log("/CREATE BOOKING");
        console.log("Successfully created Booking!\n");
        
        return res.status(201).json({
            status: "success",
            message: "Created booking successfully!",
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

const editBooking = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id).exec()

        if(!booking) {
            return res.status(404).json({
                status: "fail",
                message: "Booking ID does not exist."
            })
        }

        await Booking.updateOne({_id: req.params.id}, req.body)

        console.log("/UPDATE BOOKING");        
        console.log("Booking ID Updated!\n");
        
        return res.status(200).json({
            status: "success",
            message: "Booking details have been updated!",
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

const deleteBooking = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id).exec()

        if(!booking) {
            return res.status(404).json({
                status: "fail",
                message: "Booking ID does not exist."
            })
        }

        await Booking.deleteOne({_id: req.params.id})
        
        console.log("/DELETE BOOKING");
        console.log("Deleted Booking ID...\n");

        return res.status(200).json({
            status: "success",
            message: "Booking ID deleted successfully!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to delete booking ID...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

const deleteManyBooking = async (req: Request, res: Response) => {
    try {
        const listId = req.body.ids
        const booking = await Booking.find({_id: {$in: listId}}).exec()

        const bookingIds = new Set(booking.map(el => el._id.toString()))
        const filtered = listId.filter((id: any) => !bookingIds.has(id))

        if(filtered.length > 0) {
            return res.status(404).json({
                status: "fail",
                message: "Booking ID/s does not exist.",
                error: filtered
            })
        }

        await Booking.deleteMany({_id: {$in: listId}})

        console.log("/DELETE MANY BOOKING");
        console.log("Deleted Booking IDs...\n");

        return res.status(200).json({
            status: "success",
            message: "Successfully deleted list of Bookings!",
            method: "DELETE"
        })   
    } catch(e: any) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to delete booking IDs...",
            error: {
                name: e.name,
                message: e.message
            }
        })
    }
}

export default {
    getBookings,
    getOneBooking,
    getUserBookings,
    createUserBooking,
    editBooking,
    deleteBooking,
    deleteManyBooking
}