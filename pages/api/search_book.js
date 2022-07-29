import clientPromise from '../../utils/mongodb';

export default async function handler(request, response) {
  const { text } = request.query;
  //console.log(request.query)


  const query =[
    {
      "$search": {
        "index": "title",
        "text": {
          "query": text,
          "path": {
            "wildcard": "*"
          }
        }
      }
    },
    {$limit: 200},
    {$project: {"index":1,"coverImg":1,'title':1,'author':1,'rating':1,"likedPercent":1}}
 
    ]

   // {$project: {index:1,"coverImg":1,'title':1,'author':1,'rating':1,"likedPercent":1}}
 function check_index(item){
if (typeof item.index==='undefined') return false;
return true;
 }

//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
    //
   let data = await db.collection('books').aggregate(query).toArray();
   data=data.filter(check_index)
   
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
