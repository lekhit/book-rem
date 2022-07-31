import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import Grid from '../components/Grid_top';
import { BASE_URL } from '../utils/constants';

export default function Home({data}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Grid data={data}/>
      
    </div>
  );
}
export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await fetch(`${BASE_URL}/api/index_page?page=0`)
  const rs = await res.json()
  
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
    data:rs.result,
    },
  }
}
