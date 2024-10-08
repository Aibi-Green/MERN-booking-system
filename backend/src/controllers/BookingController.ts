import { Request, Response } from "express"
import User from '../models/user'
import Booking from '../models/booking'
import Rbooking from "../models/rbooking"
import { ObjectId } from "mongodb"
import { CustomRequest } from "../interfaces/Requests"

const getBookings = async (req: Request, res: Response) => {
  try {
    const bookingList = await Booking.find({}, "").exec()

    console.log("/GET ALL BOOKING");
    console.log("List consists of ", bookingList.length, ".\n");

    if (bookingList) {
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

/**✅
 * ViewBooking: Get One Booking
 * 
 * @param {object} req contains the following
 * @param {string} req.params.id_booking
 * @param {string} req.user.id
 * @returns 
 */
const getOneBooking = async (req: CustomRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id_booking).exec()

    if (booking && booking.id_user != req.user.id) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to access this booking."
      })
    }

    console.log("/GET ONE BOOKING");
    console.log(booking ? "Booking ID exists!\n" : "Booking ID does not exist in database...\n");

    if (booking) {
      return res.status(200).json({
        status: "success",
        data: booking,
        method: "GET"
      })
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Booking does not exist..."
      })
    }

  } catch (e: any) {
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

/**🟢
 * Gets All bookings of a user
 * 
 * @param req - An object that contains the following:
 * @param {string} req.query.purpose
 * @param {string} req.query.date_start
 * @param {string} req.query.date_end
 * @param {nuumber} req.query.status
 * @param {string[]} req.body.date_sort
 * @param {string} req.user.id
 * @returns 
 */
const getUserBookings = async (req: CustomRequest, res: Response) => {
  try {
    console.log("Getting User Bookings...");
    console.log("req: ", req.user);
    const id = req.user.id
    // const id = req.params.id
    
    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User ID does not exist."
      })
    }

    let matchQuery: { [key: string]: any } = {
      id_user: new ObjectId(id),
      purpose: { "$regex": (req.query.search) ? req.query.search : "", "$options": "i" },
    }

    let status = -1

    switch (req.query.status) {
      case "Pending":
        status = 0
        break
      case "Approved":
        status = 1
        break
      case "Rejected":
        status = 2
        break
    }

    if (status != -1) {
      matchQuery['status'] = status
    }    

    if (req.query.date_start != undefined && req.query.date_end != undefined) {
      matchQuery['$and'] = [
        {
          "date_start": {
            "$gte": req.query.date_start ? new Date(req.query.date_start as string) : new Date(),
            "$lte": req.query.date_end ? new Date(req.query.date_end as string) : new Date()
          }
        },
        {
          "date_end": {
            "$gte": req.query.date_start ? new Date(req.query.date_start as string) : new Date(),
            "$lte": req.query.date_end ? new Date(req.query.date_end as string) : new Date()
          }
        }
      ]
    }

    const date_sort = (req.query.date_sort == "true") ? 1 : -1

    const bookingList = await Booking.aggregate([
      {
        $match: matchQuery // Filter by id_booking
      },
      {
        $lookup: {
          from: "rbookings",
          localField: "_id",
          foreignField: "id_booking",
          as: "requirements"
        }
      },
      {
        $lookup: {
          from: "requirements",
          localField: "requirements.id_requirement",
          foreignField: "_id",
          as: "requirement"
        }
      },
      {
        $lookup: {
          from: "rtypes",
          localField: "requirement.id_type",
          foreignField: "_id",
          as: "type_details"
        }
      },
      {
        $project: {
          _id: 1,
          date_requested: 1,
          purpose: 1,
          date_start: 1,
          date_end: 1,
          num_participants: 1,
          status: 1,
          id_user: 1,
          requirements: {
            $map: {
              input: "$type_details", // the array to use for mapping
              as: "type", // alias for type_details
              in: {
                type: "$$type", // get type as an object
                reqs: {
                  $filter: {
                    input: "$requirement", // use requirement array for filtering
                    as: "req", // alias for requirement
                    cond: {
                      $eq: ["$$req.id_type", "$$type._id"] // condition to match the id_type
                    }
                  }
                }
              }
            }
          }
        }
      }
      // ]).sort({ "date_requested": (req.body.date_sort && req.body.date_sort == false) ? -1 : 1 })
    ]).sort({ "date_requested": date_sort })

    console.log("/GET ALL BOOKING OF ONE USER");
    console.log("List consists of ", bookingList.length, " bookings.\n");

    if (bookingList) {
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

/**🟢
 * Adds a booking
 * 
 * @param req - An object that contains the following:
 * @param {string} req.body.purpose
 * @param {string} req.body.date_start
 * @param {string} req.body.date_end
 * @param {nuumber} req.body.num_participants
 * @param {string[]} req.body.requirements
 * @param {string} req.user.id
 * @returns 
 */
const createUserBooking = async (req: CustomRequest, res: Response) => {
  try {
    const id_user = req.user.id

    // Save booking to database
    const newBooking = new Booking({
      purpose: req.body.purpose,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      num_participants: req.body.num_participants,
      requirements: req.body.requirements,
      status: 0, // 0: pending, 1: accepted, 2: rejected
      id_user: id_user
    })
    await newBooking.save()

    console.log("/CREATE BOOKING");
    console.log("Successfully created Booking!\n");

    return res.status(201).json({
      status: "success",
      message: "Created booking successfully!",
      id_booking: newBooking._id,
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


/**✅
 * Edit Booking
 * 
 * @param {object} req 
 * @param {object} req.user
 * @param {string} req.user.id_booking
 * @param {string} req.body.purpose 
 * @param {string} req.body.date_start
 * @param {string} req.body.date_end
 * @param {number} req.body.num_participants
 * @returns 
 */
const editBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id_booking).exec()

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking ID does not exist."
      })
    }
    const { date_requested, ...updatedBody } = req.body

    await Booking.updateOne({ _id: req.params.id_booking }, updatedBody)


    console.log("/UPDATE BOOKING");
    console.log("Booking ID Updated!\n");

    return res.status(200).json({
      status: "success",
      message: "Booking details have been updated!",
      method: "PUT"
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
 * Delete One Booking
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const deleteBooking = async (req: Request, res: Response) => {
  try {
    console.log("/DELETE BOOKING");

    const booking = await Booking.findById(req.params.id_booking).exec()
    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking ID does not exist."
      })
    }

    console.log("Deleting Booking Requirements ...");
    const result = await Rbooking.deleteMany({ id_booking: req.params.id_booking })
    console.log("Deleted ", result.deletedCount, " booking requirements.");


    console.log("Deleting Booking...");
    await Booking.deleteOne({ _id: req.params.id_booking })
    console.log("Deleted Booking ID...\n");

    return res.status(200).json({
      status: "success",
      message: "Booking ID deleted successfully!",
      method: "DELETE"
    })
  } catch (e: any) {
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
    const booking = await Booking.find({ _id: { $in: listId } }).exec()

    const bookingIds = new Set(booking.map(el => el._id.toString()))
    const filtered = listId.filter((id: any) => !bookingIds.has(id))

    if (filtered.length > 0) {
      return res.status(404).json({
        status: "fail",
        message: "Booking ID/s does not exist.",
        error: filtered
      })
    }

    await Booking.deleteMany({ _id: { $in: listId } })

    console.log("/DELETE MANY BOOKING");
    console.log("Deleted Booking IDs...\n");

    return res.status(200).json({
      status: "success",
      message: "Successfully deleted list of Bookings!",
      method: "DELETE"
    })
  } catch (e: any) {
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