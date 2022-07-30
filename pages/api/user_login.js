// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '../../utils/deta';

export default async  (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  
let result,user;
  
  try {
    const body = req.body
  body.key=body.username;
     user = await db.get(body.key);
     if(user.password===body.password)
result={"message":"success"}
 
else result={"message":"username and password do not match"}
 } catch (error) {
    result={"message":error}
    //res.status(200).json(result);
  }
  res.status(200).json(result);
 
};
