import clientPromise from '../../utils/mongodb';
import { BACKEND_URL } from '../../utils/constants';
export default async function handler(request, response) {
  const { book_index } = request.query;
  //console.log(request.query)


  const query = {index:parseInt(book_index)};
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
    //
   const data = await db.collection('books').find(query).toArray();
    // const books = [];
    // if (data.rows.length > 0) {
    //   data.rows.forEach((row) => {
    //     //console.log(row);
    //     books.push(row);
    //   });
    // }
    response.json({
      message: 'Success!',
      index:book_index,
      query:query,
      result: JSON.parse(JSON.stringify(data[0])),
    });
  } catch (err) {
    response.status(500).json({
      message: err.message,
    });
  }
}
