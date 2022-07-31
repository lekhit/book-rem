import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';
import { useRouter } from 'next/router';
import Grid from '../components/Grid_my';
var axios = require('axios').default;

export default function Recommender() {
  const router = useRouter()
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
  const [loading,setLoading]=useState(false)
  const [mydata,setMydata]=useState(false);
  
  const get_data= async(book_index)=>{
    setLoading(true);
      //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
      try {
        const res = await fetch(`/api/get_mongo?book_index=${book_index}`)
      const rs = await res.json()
      //console.log(rs,`${BASE_URL}/api/search_book?text=${ctx.query.text}`)
       setMydata(rs)
       setLoading(false)
      } catch (error) {
        console.log(error)
      }
      }
  
useEffect(()=>{
  const book_index=router.query.book_index;
 
  
  get_data(book_index)
 
},[router.query.book_index])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
{loading && <Backdrop/>}
      {mydata && <Grid  articles={mydata.result}/>}
    </div>
  );
}
export async function getServerSideProps(ctx) {
  // Fetch data from external API
 let data=[];
 console.log(ctx);
  //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
  try {
   // const res = await fetch(`${BASE_URL}/api/get_mongo?book_index=${ctx.query.book_index}`)
  //const rs = await res.json()
  //console.log(rs,`${BASE_URL}/api/search_book?text=${ctx.query.text}`)
   //data= JSON.parse(JSON.stringify(rs));
  } catch (error) {
    console.log(error)
  }
  
 
// let data;
// console.log(`${process.env.BASE_URL}/api/get_data?book_index=${ctx.query.book_index}` )
// fetch(`${process.env.BASE_URL}/api/get_data?book_index=${ctx.query.book_index}`)
//       .then((res) => res.json())
//       .then((dat) => {
//        // console.log(dat);
//         data=dat.result;
//       })
//       .catch((error) => {
//         console.log(`${process.env.BASE_URL}/api/get_data?book_index=${ctx.query.book_index}` )
//         console.error('Error:', error);
//       });
  // Pass data to the page via props
  return { props: { mydata :data
  } }
}