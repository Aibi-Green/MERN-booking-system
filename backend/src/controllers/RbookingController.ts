import { Request, Response } from "express"
import Rbooking from '../models/rbooking'
import Requirement from '../models/requirement'
import Booking from '../models/booking'
import { ObjectId } from 'mongodb'

const getAllRbookings = async (req: Request, res: Response) => {
  try {
    const rbookingList = await Rbooking.find({}, "").exec()

    console.log("/GET ALL VENUE REQUIREMENT BOOKING");
    console.log("List consists of ", rbookingList.length, ".\n");

    if (rbookingList) {
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
    const rbookingList = await Rbooking.find({ id_booking: req.params.id }, "").exec()

    console.log("/GET ALL VENUE REQUIREMENT FOR ONE BOOKING");
    console.log("List consists of ", rbookingList.length, ".\n");

    if (rbookingList) {
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
    console.log("/CREATE VENUE REQUIREMENT BOOKING");

    console.log("Checking if id_booking exists...");
    const bookingExists = await Booking.find({ _id: req.body.id_booking }, "").exec()
    if (!(bookingExists.length > 0)) {
      console.log("Booking does not exist.");
      return res.status(400).json({
        status: "fail",
        message: "Booking ID does not exist..."
      })
    }
    console.log("Booking exists!");

    console.log("Checking if id_requirements exists");
    const reqList = await Requirement.find({}, "_id").exec()
    const reqListId = reqList.map(i => i._id.toString())
    req.body.id_requirements.some((id: string) => {
      if (!reqListId.includes(id)) {
        return res.status(400).json({
          status: "fail",
          message: "Requirement ID does not exist..."
        })
      }
    })
    console.log("Requirement ID exists!");

    // Create array for insertmany
    const insertArr = req.body.id_requirements.map((id_requirement: string) => {
      return {
        id_booking: req.body.id_booking,
        id_requirement: id_requirement
      }
    })
    const result = await Rbooking.insertMany(insertArr)

    console.log("Successfully created Venue Requirement Booking!\n");

    return res.status(201).json({
      status: "success",
      message: "Created Venue Requirement Booking successfully!",
      method: "POST"
    })
  } catch (e: any) {
    if (e.name === "ValidationError") {
      let errors: { [key: string]: string } = {}
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
    console.log("/DELETE VENUE REQUIREMENT");
    
    // Deletes all requirements provided
    if ('id_requirements' in req.body && typeof (req.body.id_requirements) == "object") {
      const result = await Rbooking.deleteMany({ id_booking: req.params.id, id_requirement: { $in: req.body.id_requirements } })
      console.log("Deleted ", result.deletedCount, " documents");
    } 
    // Deletes all requirements of a booking
    else if ('id' in req.params) {
      const result = await Rbooking.deleteMany({ id_booking: req.params.id })
      console.log("Deleted ", result.deletedCount, " documents");
    } 
    else {
      return res.status(400).json({
        status: "fail",
        message: "Missing required properties..."
      })
    }

    console.log("Deleted Venue Requirement ID...\n");

    return res.status(200).json({
      status: "success",
      message: "Booking Requirement/s deleted successfully!",
      method: "DELETE"
    })
  } catch (e: any) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to delete Booking Requirement/s ID...",
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