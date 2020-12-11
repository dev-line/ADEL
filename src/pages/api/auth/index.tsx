import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
const { SECRET } = process.env
export default function getAllProducts(req: NextApiRequest, res: NextApiResponse) {
  verify(req.cookies.auth!, SECRET!, async (err, decoded) => {
    if (!err && decoded) {
      res.status(200).json({ message:"isAuth" })
    } else {
      res.status(400).json({ message: "You don't have authorisation" })
    }
  })
}