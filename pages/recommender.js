import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';
import { useRouter } from 'next/router';
import Grid from '../components/Grid_my';
var axios = require('axios').default;

export default function Home({mydata}) {
  const [loading, setLoading] = useState(false);
  //const [data, setData] = useState();
  const router = useRouter();
  const { isbn } = router.query;
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
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
{!mydata && Backdrop}
      {mydata&&<Grid  articles={mydata.result}/>}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const params={
    book_index:0
  }
  //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
  const res = await fetch(`${process.env.BASE_URL}/api/get_mongo?book_index=${ctx.query.book_index}`)
  const rs = await res.json()
const data= JSON.parse(JSON.stringify(rs));

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
  return { props: {
    mydata :data
  } }
}
