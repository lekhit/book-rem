import connect_db from '../../utils/cockroachdb';

export default async function handler(request, response) {
  const { book_index } = request.query;
  //console.log(request.query)
  const back_data=await fetch(`${process.env.BACKEND_URL}/index?index=${book_index}`);
  const {result}= await back_data.json();

  const query = `select author,title,"coverImg","likedPercent","index",description from mydb WHERE mydb.index in (${result}) `;
//console.log(query,result)
  try {
    const client = await connect_db();
   const data = await client.query(query);
    const books = [];
    if (data.rows.length > 0) {
      data.rows.forEach((row) => {
        //console.log(row);
        books.push(row);
      });
    }
    response.json({
      message: 'Success!',
      result: JSON.parse(JSON.stringify(books)),
    });
  } catch (err) {
    response.status(500).json({
      message: err.message,
    });
  }
}
