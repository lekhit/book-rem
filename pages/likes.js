import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';

import {useAppContext} from '../context/notes/state'
import Grid from '../components/Grid_my';
import { BASE_URL } from '../utils/constants';


export default function Home() {
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
  const is_login=useAppContext();
  const getData= 
    async ()=>{
      
          const response=await fetch('/api/get_liked_data?' + new URLSearchParams({
           "username":is_login.username
        }))
          const rs=await response.json() 
          setMydata(rs);
          console.log(rs
            )
  }
  const [mydata,setMydata]=useState(false)
  useEffect(()=>{
    
    if(is_login.login )
{getData();
}
  },[]
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      {!is_login.login && <Backdrop/>}
      {is_login.login && <>
{( !mydata) && <Backdrop/>}
      {mydata&&<Grid  articles={mydata.result}/>}
      </>}
    </div>
  );
}
