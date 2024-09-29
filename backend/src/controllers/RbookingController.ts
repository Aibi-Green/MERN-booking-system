import { Request, Response } from "express"
import Rbooking from '../models/rbooking'
import Requirement from '../models/requirement'
import Booking from '../models/booking'
import { ObjectId } from 'mongodb'
import { CustomRequest } from "../interfaces/Requests"
import User from "../models/user"

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
    // const rbookingList = await Rbooking.find({ id_booking: req.params.id }, "").exec()
    const rbookingList = await Rbooking.aggregate([
      {
        $match: { id_booking: new ObjectId(req.params.id_booking) } // Filter by id_booking
      },
      {
        $lookup: {
          from: "requirements", // the collection you're joining
          localField: "id_requirement", // field from rbookings
          foreignField: "_id", // field from requirements
          as: "requirementDetails" // alias to store the joined data
        }
      },
      {
        $unwind: "$requirementDetails" // flatten the array if there's only one match
      },
      {
        $project: {
          // to include/exclude fields in the result
          id_requirement: 1,
          name: "$requirementDetails.name",
          id_type: "$requirementDetails.id_type"
        }
      },
      {
        $lookup: {
          from: "rtypes",
          localField: "id_type",
          foreignField: "_id",
          as: "typeDetails"
        }
      },
      {
        $unwind: "$typeDetails"
      },
      {
        $project: {
          id_requirement: 1,
          name: 1,
          id_type: 1,
          type: "$typeDetails.name"
        }
      }
    ])

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

/**✅
 * createRbookings: Create Requirement Bookings in an array
 * 
 * @param {body} req
 * @param {string} req.body.id_booking
 * @param {string[]} req.body.id_requirement
 * @returns 
 */
const createRbookings = async (req: CustomRequest, res: Response) => {
  try {
    console.log("/CREATE VENUE REQUIREMENT BOOKING");
    console.log("id_booking: ", req.params.id_booking);
    

    const bookingResult = await Booking.find({
      _id: req.params.id_booking, 
      id_user: req.user.id
    }, "").exec()

    if (!(bookingResult.length > 0)) {
      return res.status(400).json({
        status: "fail",
        message: "This user does not have this booking..."
      })
    }

    console.log("Checking if id_booking exists...");
    const bookingExists = await Booking.find({ 
      _id: req.params.id_booking 
    }, "").exec()

    if (!(bookingExists.length > 0)) {
      console.log("Booking does not exist.");
      return res.status(400).json({
        status: "fail",
        message: "Booking ID does not exist..."
      })
    }
    console.log("Booking exists!");

    console.log("Checking if id_requirement exists");
    const reqList = await Requirement.find(
      { _id: { $in: req.body.id_requirement } }, 
      '_id'
    ).exec()
    if (req.body.id_requirement.length != reqList.length) {
      return res.status(400).json({
        status: "fail",
        message: "One of the Requirement ID does not exist..."
      })
    }
    console.log("Requirement ID exists!");

    // Create array for insertmany
    console.log("Creating insert Arr...");
    const insertArr = req.body.id_requirement.map((id_requirement: string) => {
      return {
        id_booking: req.params.id_booking,
        id_requirement: id_requirement
      }
    })

    console.log("Inserting array to database...");
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

/**🟡
 * deleteRbookings: Delete Requirement Bookings in an array
 * 
 * @param {body} req
 * @param {string} req.body.id_booking
 * @param {string[]} req.body.id_requirement
 * @returns 
 */
const deleteRbookings = async (req: CustomRequest, res: Response) => {
  try {
    console.log("/DELETE VENUE REQUIREMENT");

    const result = await Booking.find({
      _id: req.params.id_booking, 
      id_user: req.user.id
    })

    if (!(result.length > 0)) {
      return res.status(400).json({
        status: "fail",
        message: "This user does not have this booking..."
      })
    }

    // Deletes all requirements provided
    if ('id_requirement' in req.body && 'id_booking' in req.params) {
      console.log("Deleting selected requirements from booking");
      
      const result = await Rbooking.deleteMany({
        id_booking: req.params.id_booking,
        id_requirement: {$in: req.body.id_requirement}
      })
      console.log("Deleted ", result.deletedCount, " documents");
    }
    // Deletes all requirements of a booking
    else if ('id_booking' in req.params) {
      console.log("Deleting all requirements...");
      // const result = await Rbooking.deleteMany({ id_booking: req.params.id })
      // console.log("Deleted ", result.deletedCount, " documents");
    }
    else {
      return res.status(400).json({
        status: "fail",
        message: "Missing required properties..."
      })
    }

    console.log("Deleted Venue Requirement ID/s...\n");

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