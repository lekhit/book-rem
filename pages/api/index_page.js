
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from '../../utils/mongodb';


// eslint-disable-next-line import/no-anonymous-default-export
export default async  (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  const {page}=req.query;
  const query = {index:{$gt:page*20,$lt:(page+2)*20}};
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
   const data = await db.collection('books').find(query).project({"coverImg":1,index:1,title:1,author:1}).toArray();

    // const books = [];
    // if (data.rows.length > 0) {
    //   data.rows.forEach((row) => {
    //     //console.log(row);
    //     books.push(row);
    //   });
    // }
    res.json({
      message: 'Success!',
      result: JSON.parse(JSON.stringify(data)),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }


};