// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from '../../utils/deta';

export default async  (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  
let result,user;
const body = req.body
  try {
    
   
  body.key=body.username;
  const db=await client.Base('users1')
     user = await db.get(body.key);
     if(user.password===body.password)
result={"message":"success"}
 
else result={"message":"username and password do not match"}
 } catch (error) {
    result={"message":error,"data":body}
    //res.status(200).json(result);
  }
  res.status(200).json(result);
 
};
