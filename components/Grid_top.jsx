import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Container, Paper } from '@mui/material';
import Mycard from './card';
import Masonry from '@mui/lab/Masonry';
import { Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import Mysample from './sample';
import Loading from './loading';
import Backdrop from './backdrop';
var axios = require('axios').default;

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: 'lightblue',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'blue',
    opacity: [0.9, 0.8, 0.7],
  },
  onClick: {},
}));

export default function FixedColumns(props) {
  const [articles, setArticles] = useState(props.data);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);

  const [progress, setProgress] = useState(10);

  function LinearDeterminate() {
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setLoading(false);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant="determinate"
          color="warning"
          value={progress}
        />
      </Box>
    );
  }

  const updateBooks = async () => {
    setLoading(true);

    const res = await fetch(`${BASE_URL}/api/index_page?page=${page}`)
  const rs = await res.json()
  setArticles(articles.concat(rs.result));
  setLoading(false);
     
    // var options = {
    //   method: 'GET',
    //   url: `${process.env.BASE_URL}/api/index_page`,
    //   params: { page: page },
    // };
    
    // setProgress(55);
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     setProgress(99);

    //     //setArticles(articles.concat(response.data.result));
    //     setArticles(response.data.result)
    //     console.log(response);
    //     setMore(false);
    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.error(error);

    //   });

    //let parsedData = await data.json();
    //console.log(parsedData);
    //setArticles(parsedData.results);
  };

  useEffect(()=>{
    updateBooks();

  },[page])

  // useEffect(() => {
  //   let didCancel = false;
  
   
  //   const updateBooks = async () => {
  //     setLoading(true);
  
  //     const res = await fetch(`${BASE_URL}/api/index_page?page=${page}`)
  //   const rs = await res.json()
  //   if (!didCancel) { // Ignore if we started fetching something else
  //     console.log(rs);
  //   }
  //   //setArticles(articles.concat(rs.result));
  //   setArticles(rs.result)
  //   setLoading(false);
  // }
  //   updateBooks();
  //   return () => { didCancel = true; }; // Remember if we start fetching something else
  // }, [page]);

  const fetchMore = () => {
    if (!loading) {
      
      setPage(page + 1);
    }
  };

  //console.log(articles);
  return (
    <>
    {loading  && <Backdrop/>}
      {/*Put the scroll bar always on the bottom*/}
      {articles && < Container sx={{ minHeight: 253, pt: 18 }} id="scrollableDiv">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMore}
          //
          hasMore={true}
          loader={<LinearDeterminate />}
        >
          <Grid container direction="row"
  justifyContent="space-around"
  alignItems="flex-start"
   columns={{ sx: 1, md: 2, lg: 3 }} spacing={0.5}>
            { articles.map((height, index) => (
              <Grid key={index} item sx={{ p: 2 }}>
                <Item>
                  <Mycard key={index} article={height} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>}

      <Button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </Button>
    </>
  );
}
