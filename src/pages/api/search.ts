


import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';

// fake data
// import products from '../../utils/data/products';

export default async (_req: NextApiRequest, res: NextApiResponse) => {

  // const product = _req.body.product
  if (_req.method === 'GET') {


    let limit = typeof Number(_req.query.limit) === 'number' ? Number(_req.query.limit) : 50;
    let search = _req.query?.search ? decodeURIComponent(`${_req.query.search}`) : ''
    console.log('search: ', search);
    // maloma ma7sora
    // 5abera basera
    // kabera
    // Process a POST request
    // if (!product) return res.status(400).json({success:false})
       const ProductsCollection = await client.db("itemdb").collection("Products")
       const docs = await ProductsCollection.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
        ]
    }).limit(limit )

      //  await ProductsCollection.find()


      const products : any[] = [];
       await docs.forEach((prod:any) =>{
              products.push(prod);
        })
        if (products.length > 0) {
            return res.status(200).json(products);
          }
}
return res.status(404).json(null);
    // return res.status(200).send(products)
}
