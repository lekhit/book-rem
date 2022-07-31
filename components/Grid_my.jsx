import { Masonry } from '@mui/lab';
import { Grid, Container } from '@mui/material';
import { Item } from './Grid_top';
import Mycard from './card';


export default function LinearDeterminate(props) {

  // useEffect(() => {
  // //   if (props.articles) setOpen(false);
  // //   else setOpen(true);
  // console.log(props)
  //  });

  return (
    <>
      <Container sx={{ minHeight: 253, pt: 18 }} id="scrollableDiv">
        <Masonry container columns={{ sx: 1, md: 2, lg: 3 }} spacing={2.5}>
        {props.articles &&
            props.articles.map((height, index) => (
              <Grid columns={{ sx: 1, md: 2, lg: 3 }} key={index}>
                <Item>
                  <Mycard key={index} article={height} open={false} />
                </Item>
              </Grid>
            ))}
         
        </Masonry>
      </Container>
    </>
  );
}
