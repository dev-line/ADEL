import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();
export default async function getAllCommands(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    await prisma.commands.findMany().then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.json([])
    })
  } else if (req.method == "POST") {

    await prisma.commands.create({ data: {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      Products:req.body.Products
    } }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(400).json(err)
    })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}