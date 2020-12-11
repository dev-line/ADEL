import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';

const prisma = new PrismaClient();
export default Auth(async function getAllProducts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    await prisma.products.findMany({include:{categories: true},where:{published: true}}).then(data => {
      res.json(data)
    }).catch(err => {
      res.json([])
    })
  } else if (req.method == "POST") {
    await prisma.products.create({ data: {
      name: req.body.name,
      image: req.body.image,
      price_blacquer: req.body.price_blacquer,
      price_silver: req.body.price_silver,
      published: req.body.published,
      categories: {connect:req.body.categories}
    } }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(401).json(err)
    })
  }
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}