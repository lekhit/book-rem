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
      <Grid container direction="row"
  justifyContent="space-around"
  alignItems="flex-start"
   columns={{ sx: 1, md: 2, lg: 3 }} spacing={0.5}>
            { props.articles.map((height, index) => (
              <Grid key={index} item  sx={{pt:2,pb:2}}>
                <Item>
                  <Mycard key={index} article={height} />
                </Item>
              </Grid>
            ))}
          </Grid>
      </Container>
    </>
  );
}
