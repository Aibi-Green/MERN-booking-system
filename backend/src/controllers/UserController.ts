import { Request, Response } from "express"
import User from '../models/user'
import { CustomRequest } from "../interfaces/Requests";

const getUsers = async (req: Request, res: Response) => {
  try {
    const userList = await User.find({}, "name username contact_person").exec()

    console.log("/GET ALL USER");
    console.log("List consists of ", userList.length, " users.\n");

    if (userList) {
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

/** 🟡
 * GetOneUser: Get One User Details
 * 
 * @param req.user.id
 * @param res 
 * @returns 
 */
const getOneUser = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.find(
      { _id: req.user.id },
      "username email name contact_person contact_number"
    ).exec()

    // 📍change profile details separate into pages📍

    // if (!req.query.search) {
    //     console.log("ID Search");
    //     user = await User.find({ _id: req.params.id }, "username email name contact_person contact_number password").exec()

    //     console.log("/GET ONE USER");
    //     console.log(Object.keys(user).length > 0 ? "User exists!\n" : "User does not exist in database...\n");
    // }
    // else {
    //     // FULL TEXT SEARCH
    //     // enables us to search for documents based on the text content of one or more fields.
    //     console.log("Full Text Search");
    //     const str = (req.query.search != undefined) ? req.query.search.toString() : ""
    //     user = await User.find({ $text: { $search: str } }).exec()

    //     console.log("/SEARCH USER");
    //     console.log("Found " + Object.keys(user).length + " users!");
    // }

    if (user.length > 0) {
      return res.status(200).json({
        status: "success",
        data: user,
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

/**🟡
 * Create new Account
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const signUpUser = async (req: Request, res: Response) => {
  try {
    // const newUser = new User(req.body)
    // await newUser.save()

    const user: any = await User.signup(req.body)

    const token = User.createToken(user._id)

    console.log("/CREATE USER");
    console.log("Successfully created User!\n");

    return res.status(201).json({
      status: "success",
      message: "User account created successfully!",
      token: token,
      email: user.email,
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
    } else {
      return res.status(400).json({
        status: "fail",
        message: e.message,
      })
    }
  }
}

/**✅
 * LogInUser: Login
 * 
 * @param {object} req 
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param res 
 * @returns 
 */
const logInUser = async (req: Request, res: Response) => {
  try {
    console.log("LOGGIN IN!");

    const user: any = await User.login(req.body)
    console.log(user);

    const token = await User.createToken(user._id)

    return res.status(201).json({
      status: "success",
      message: "User successfully logged in!",
      token: token,
      email: user.email,
      method: "POST"
    })
  } catch (e: any) {
    return res.status(400).json({
      status: "fail",
      message: e.message,
    })
  }
}

/**🟡
 * EditUser: Edit Profile lile User Details and password
 * 
 * @param req 
 * @param req.user.id
 * @param req.body.username?
 * @param req.body.email?
 * @param req.body.name?
 * @param req.body.contact_person?
 * @param req.body.contact_number?
 * @param res 
 * @returns 
 */
const editUser = async (req: CustomRequest, res: Response) => {
  try {
    if (!('password' in req.body)) {
      const user = await User.changeUserDetails(req.user.id, req.body)

      console.log("/UPDATE USER");
      console.log("User ID Updated!\n");

      return res.status(200).json({
        status: "success",
        message: "User details have been updated!",
        method: "PUT"
      })
    } else {
      const user = await User.changePassword(req.user.id, req.body)

      console.log("/UPDATE USER");
      console.log("User ID password Updated!\n");

      return res.status(200).json({
        status: "success",
        message: "User password have been updated!",
        method: "PUT"
      })
    }

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

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User ID does not exist."
      })
    }

    await User.deleteOne({ _id: req.params.id })

    console.log("/DELETE USER");
    console.log("Deleted User ID...\n");

    return res.status(200).json({
      status: "success",
      message: "User account deleted successfully!",
      method: "DELETE"
    })
  } catch (e: any) {
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