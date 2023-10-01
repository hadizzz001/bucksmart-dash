import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';
import { ObjectId } from 'mongodb';




export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  const id = req.query.pid;
  const item = req.body.state

    const product = await client.db("itemdb").collection("Products")
    .updateOne({_id:new ObjectId(`${id}`)} , {$set:{title:item.title,weight:item.weight,price:item.price,description:item.description,category:item?.category,
    images:item.images,isFeatured:item.isFeatured,inStock: item?.inStock,subCategory:item?.subCategory,type:item?.type}});
    if (product && product?.modifiedCount !== 0) {
         return res.status(200).json({success:true});
        }
}
return res.status(400).json({success:false});

}
