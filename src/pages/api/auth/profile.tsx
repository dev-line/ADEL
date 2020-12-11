import {NextApiRequest, NextApiResponse} from 'next'
import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
const prisma = new PrismaClient()

export default async function GetUser(req: NextApiRequest, res: NextApiResponse){
  if (req.method == "POST") {
    await prisma.users.findUnique({where:{id:req.body.id}}).then(user=>{
      res.status(200).json(user)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }
  else if(req.method == "PUT"){
    await prisma.users.findUnique({where:{id:req.body.id}}).then(user=>{
      compare(req.body.OldPass,user?.password!,async(err,isTrue)=>{
        if (!err&&isTrue) {
          if (req.body.password) {
            hash(req.body.password, 10, async(err,Password)=>{
              if (!err) {
            await prisma.users.update({where:{id:req.body.id},data:{email:req.body.email,name:req.body.name,username:req.body.username,password:Password}}).then(user=>{
              res.status(200).json(user)
            }).catch(err=>{
              res.status(500).json(err)
            })
          }else{
            res.status(402)
          }
        })
          }else{
            await prisma.users.update({where:{id:req.body.id},data:{email:req.body.email,name:req.body.name,username:req.body.username}}).then(user=>{
              res.status(200).json(user)
            }).catch(err=>{
              res.status(500).json(err)
            })
          }
        }else{
          res.status(403)
        }
      })
    }).catch(err=>{
      res.status(400).json(err)
    })
  }

}