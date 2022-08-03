import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Grid from '../components/Grid_top';

import Mydata from '../public/sample'

export default function Home({data}) {
  return (
    <div>
      <Head>
        <title>AI-Recommender</title>
      </Head>
      <Grid data={data}/>
      
    </div>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
    data:Mydata.result,
    },
  }
}
