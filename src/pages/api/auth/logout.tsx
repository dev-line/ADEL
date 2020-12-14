import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next'
import { Auth } from '../../../services/Auth';

export default Auth(async function Logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
    await res.setHeader("Set-Cookie", serialize("auth", "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development", maxAge: 3600 * 24, path: "/" }))
    res.status(200)
    } catch (error) {
      res.status(500)
    }
  }else{
    res.status(404)
  }

})