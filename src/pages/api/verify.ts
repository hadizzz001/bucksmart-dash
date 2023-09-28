import type { NextApiRequest, NextApiResponse } from 'next';
// import client from './mongodb';
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// MONGODB_URI= "mongodb+srv://nicky234:jc7ap0dFcwvZdo09@cluster0.7cpxz.mongodb.net?retryWrites=true&w=majority"
export default  async (req: NextApiRequest, res: NextApiResponse)  => {
  try {
    if (req.method === 'GET') {
      // Process a POST request


  const userToken = req?.query?.token ;

     const token = await jwt.verify(userToken, `5125125wrqwr124f1u2409u1f2094u1f295hf1i2uh58912h5f891h295fh1295f129805h1f825`);
     if (!token) {throw 'Error generating token'}

     return res.status(200).json({ authorized: true});

}

}
catch(e) {
  console.log('e: ', e);
  return res.status(401).json({ authorized: false });

}
}
