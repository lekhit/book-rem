import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import Grid from '../components/Grid_top';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <NavBar />
      <Grid />
      this is text
    </div>
  );
}
