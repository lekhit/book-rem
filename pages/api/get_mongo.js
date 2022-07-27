import clientPromise from '../../utils/mongodb';

export default async function handler(request, response) {
  const { book_index } = request.query;
  //console.log(request.query)
  const back_data=await fetch(`${process.env.BACKEND_URL}/index?index=${book_index}`);
  const {result}= await back_data.json();

  const query = {index:{$in:result}};
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
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
      result: JSON.parse(JSON.stringify(data)),
    });
  } catch (err) {
    response.status(500).json({
      message: err.message,
    });
  }
}
