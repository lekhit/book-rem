import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';
import { useRouter } from 'next/router';
import Grid from '../components/Grid_my';
import { BASE_URL } from '../utils/constants';


export default function Search() {
  const router=useRouter()
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
  const [mydata,setMydata]=useState(false);
  const [loading,setLoading]=useState(false)
 
  
  const get_data= async(book_index)=>{
    setLoading(true);
      //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
      try {
        const res = await fetch(`/api/search_book?text=${book_index}`)
      const rs = await res.json()
      //console.log(rs,`${BASE_URL}/api/search_book?text=${ctx.query.text}`)
       setMydata(rs)
       setLoading(false)
      } catch (error) {
        console.log(error)
      }
      }
useEffect( ()=>{
  const text=router.query.text;
  
  get_data(text);
  //console.log(`${process.env.BASE_URL}/api/get_book?book_index=${ctx.query.book_index}` )
  
},[router.query.text])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
{loading && <Backdrop/>}
      {mydata&&<Grid  articles={mydata.result}/>}
    </div>
  );
}
