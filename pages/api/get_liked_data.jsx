import clientPromise from '../../utils/mongodb';
import deta from '../../utils/deta'

export default async function handler(request, response) {
  const { username } = request.query;
const get_db=await deta.Base('users1')
const user=await get_db.get(username)

  //console.log(request.query)
  const like_array=[]
      for (const [key, value] of Object.entries(user.likes)) {
        if(value) like_array.push(parseInt(key))
      }


  //const {result}= await back_data.json();

  const query = {index:{$in:like_array}};
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
    //
   const data = await db.collection('books').find(query).project({index:1,"coverImg":1,'title':1,'author':1,'rating':1,"likedPercent":1}).toArray();
    // const books = [];
    // if (data.rows.length > 0) {
    //   data.rows.forEach((row) => {
    //     //console.log(row);
    //     books.push(row);
    //   });
    // }
    response.json({
      message: 'Success!',
      result: JSON.parse(JSON.stringify(data)),
      query:query
    });
  } catch (err) {
    response.status(500).json({
      message: err.message,
      result:result
    });
  }
}
