// Next.s API route support: https://nextjs.org/docs/api-routes/introduction
import client from '../../utils/deta';

export default async  (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  let result,user;
 
  if (req.method === 'POST') {
    
  
  
    const body = req.body

  
  try {
    
  body.key=body.username;
  const db=await client.Base(body.username)
  //user=await db.update({"likes":[]},body.username)
     user = await db.put({"key":body.index.toString()})
result={"message":"success","user":user}

 } catch (error) {
    result={"message":error,"body":body}
    //res.status(200).json(result);
  }
  res.status(200).json(result);
}

else {
  const  body=req.query
  try {
    
 
 const   db=await client.Base(body.username)
    //user=await db.update({"likes":[]},body.username)
 await db.delete(body.index.toString())
  result={"message":"success"}
  
   } catch (error) {
      result={"message":error,"body":body}
      //res.status(200).json(result);
    }
    res.status(200).json(result);
  }
};
