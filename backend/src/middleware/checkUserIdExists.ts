import { NextFunction, Request, Response } from "express";
import User from "../models/user";
// import { jwtDecode } from 'jwt-decode'

export const checkUserIdExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = null

    if (req.params.id) {
      console.log("req.params.id: ", req.params.id);
      user = await User.findById(req.params.id).exec()
    } else if (req.body.id_user) {
      console.log("req.body.id_user: ", req.body.id_user);
      user = await User.findById(req.body.id_user).exec()
    }

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User ID does not exist."
      })
    }

    next()
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "Server error while checking user.",
      error: e
    })
  }
}