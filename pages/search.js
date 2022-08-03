import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';
import { useRouter } from 'next/router';
import Grid from '../components/Grid_my';
import { BASE_URL } from '../utils/constants';
import clientPromise from '../utils/mongodb';


export default function Search({heading,mydata1}) {
//   const router=useRouter()
//   //const [data, setData] = useState();
//   // useEffect(() => {
//   //   //Get_books();
//   // });

//   // const Get_Data = () => {
//   //   setLoading(true);
//   //   console.log(isbn);
//   //   fetch(`https://rem4.lekhitborole.repl.co/book?book_isbn=${isbn}`)
//   //     .then((res) => res.json())
//   //     .then((dat) => {
//   //       console.log(dat);
//   //       setData(dat.result);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error:', error);
//   //     });
//   // };
//   const [mydata,setMydata]=useState(false);
//   const [loading,setLoading]=useState(false)
 
  
//   const get_data= async(book_index)=>{
//     setLoading(true);
//       //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
//       try {
//         const res = await fetch(`/api/search_book?text=${book_index}`)
//       const rs = await res.json()
//       //console.log(rs,`${BASE_URL}/api/search_book?text=${ctx.query.text}`)
//        setMydata(rs)
//        setLoading(false)
//       } catch (error) {
//         console.log(error)
//       }
//       }
// useEffect( ()=>{
//   const text=router.query.text;
  
//   get_data(text);
//   //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
  
// },[router.query.text])
  return (
    <div >
      <Head>
        <title>{heading}</title>
      </Head>
      {mydata1&&<Grid  articles={mydata1}/>}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  //console.log(request.query)
  const { text } = ctx.query;
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
let data;
//console.log(query,result)
  try {
    const client = await clientPromise
    const db=await client.db('books');
    //
   data = await db.collection('books').aggregate(query).toArray();
   data=data.filter(check_index)
   
    // const books = [];
    // if (data.rows.length > 0) {
    //   data.rows.forEach((row) => {
    //     //console.log(row);
    //     books.push(row);
    //   });
    // }
    
  } catch (err) {
    console.log(err)
  data={"message":err};
  }
  // Pass data to the page via props
  return { props: { mydata1:JSON.parse(JSON.stringify(data)),heading:text} }
}