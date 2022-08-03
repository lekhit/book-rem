import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';
import { useRouter } from 'next/router';
import Grid from '../components/Grid_my';

import clientPromise from '../utils/mongodb';
import { BACKEND_URL } from '../utils/constants';

export default function Recommender({mydata1}) {
  //const [data, setData] = useState();
  // useEffect(() => {
  //   //Get_books();
  // });

  // const Get_Data = () => {
  //   setLoading(true);
  //   console.log(isbn);
  //   fetch(`https://rem4.lekhitborole.repl.co/book?book_isbn=${isbn}`)
  //     .then((res) => res.json())
  //     .then((dat) => {
  //       console.log(dat);
  //       setData(dat.result);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
//   const [loading,setLoading]=useState(false)
//   const [mydata,setMydata]=useState(false);
  
//   const get_data= async(book_index)=>{
//     setLoading(true);
//       //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
//       try {
//         const res = await fetch(`/api/get_mongo?book_index=${book_index}`)
//       const rs = await res.json()
//       //console.log(rs,`${BASE_URL}/api/search_book?text=${ctx.query.text}`)
//        setMydata(rs)
//        setLoading(false)
//       } catch (error) {
//         console.log(error)
//       }
//       }
  
// useEffect(()=>{
//   const book_index=router.query.book_index;
 
  
//   get_data(book_index)
 
// },[router.query.book_index])


  return (
    <div >
      <Head>
        <title>Recommendations</title>
      </Head>


      {mydata1 && <Grid  articles={mydata1}/>}

    </div>
  );
}


export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const { book_index } = ctx.query;
  //console.log(request.query)
  const back_data=await fetch(`${BACKEND_URL}?index=${book_index}`);
  const {result}= await back_data.json();

  const query = {index:{$in:result}};
  let data;
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
    //
data = await db.collection('books').find(query).project({index:1,"coverImg":1,'title':1,'author':1,'rating':1,"likedPercent":1}).toArray();
data.sort((a, b) => result.indexOf(a.index) - result.indexOf(b.index));
    // const books = [];
    // if (data.rows.length > 0) {
    //   data.rows.forEach((row) => {
    //     //console.log(row);
    //     books.push(row);
    //   });
    // }

  } catch (err) {
    data={"message":err}
   console.log("some error ",err)
  }

  // Pass data to the page via props
  return { props: { mydata1 :JSON.parse(JSON.stringify(data))} }
}