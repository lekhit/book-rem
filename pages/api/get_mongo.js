import clientPromise from '../../utils/mongodb';
import { BACKEND_URL } from '../../utils/constants';
export default async function handler(request, response) {
  const { book_index } = request.query;
  //console.log(request.query)
  const back_data=await fetch(`${BACKEND_URL}/index?index=${book_index}`);
  const {result}= await back_data.json();

  const query = {index:{$in:result}};
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
    ////.project({index:1,"coverImg":1,'title':1,'author':1,'genres':1,'rating':1})
   const data = await db.collection('books').find(query).toArray();
data.sort((a, b) => result.indexOf(a.index) - result.indexOf(b.index));
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
    });
  } catch (err) {
    response.status(500).json({
      message: err.message,
    });
  }
}
