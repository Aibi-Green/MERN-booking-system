import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers['authorization']
    const token = auth && auth.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "401 Unauthorized"
      })
    }
    

    jwt.verify(token, process.env.SECRET_STRING as string, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({
          status: "fail",
          message: "403 Forbidden"
        })
      }
      // req.user = user
    })
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "Server error while verifying token.",
      error: e
    })
  }

  next()
}