// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from '../../utils/deta';

export default async  (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  
let user;
  const body = req.body
  body.key=body.username;

  try {
   const  db=await client.Base("users1")
     user = await db.insert(body);
     user.message="success";
  } catch (error) {
    user={"message":"error"}
    res.status(400).json(user);
  }



  res.status(200).json(user);
};
