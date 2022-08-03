import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Backdrop from '../components/backdrop';
import clientPromise from '../utils/mongodb';
import deta from '../utils/deta'
import {useAppContext} from '../context/notes/state'
import Grid from '../components/Grid_my';


export default function Likes() {
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
    <div>
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

export async function getServerSideProps(request) {
  
  const { username } = request.query;
  const get_db=await deta.Base('users1')
  const user=await get_db.get(username)
  
    //console.log(request.query)
    const like_array=[]
        for (const [key, value] of Object.entries(user.likes)) {
          if(value) like_array.push(parseInt(key))
        }
  
  
    //const {result}= await back_data.json();
  
    const query = {index:{$in:like_array}};
  //console.log(query,result)
    try {
      const client = await clientPromise
      const db=await client.db('books');
      //
     const data = await db.collection('books').find(query).project({index:1,"coverImg":1,'title':1,'author':1,'rating':1,"likedPercent":1}).toArray();
      // const books = [];
      // if (data.rows.length > 0) {
      //   data.rows.forEach((row) => {
      //     //console.log(row);
      //     books.push(row);
      //   });
      // }
      
    } catch (err) {
      data={"message":err}
    }
  // Pass data to the page via props
  return { props: { mydata1:JSON.parse(JSON.stringify(data)),heading:text} }
}