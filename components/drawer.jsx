import * as React from 'react';
import {Box,Container,Divider} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { BASE_URL } from '../utils/constants';

import CircularProgress from '@mui/material/CircularProgress';


import Typography from '@mui/material/Typography';
export default function TemporaryDrawer(props) {
  const [article,setArticle]=React.useState({});
  const [loading,setLoading]=React.useState(true);
    const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
React.useEffect(()=>{

  const get_data=async()=>{
  const res = await fetch(`/api/book_details?book_index=${props.book_index}`)
  const rs = await res.json()
setArticle(rs.result);

setLoading(false)
}
if (state.bottom)
get_data();



},[state.bottom])
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
const check_series=()=>props.series.length>5;

  const list = (anchor) => (
    <Box
      sx={{mt:2, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,maxHeight:450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >{loading && <CircularProgress disableShrink />}
            
 {!loading && <Container>
  <Typography variant="h5" component="div">
          Description
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {article.description}
        </Typography>
        <Divider />
        <Typography variant="h6" component="div">
        Genres
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.genres}
        </Typography>

        {check_series && <>
        
        <Typography variant="h6" component="div">
       Series
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.series}
        </Typography>
        </>
        }
        <Typography variant="h6" component="div">
       Pages
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.pages}
        </Typography>
        <Typography variant="h6" component="div">
       Published
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.publishDate}
        </Typography>
        <Typography variant="h6" component="div">
       Type
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.bookFormat}
        </Typography>
        <Typography variant="h6" component="div">
       Settings
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.setting}
        </Typography>
        <Typography variant="h6" component="div">
       Awards
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {article.awards}
        </Typography>

        <Typography variant="body2">
          well meaning and kindly.
        
          {'"a benevolent smile"'}
        </Typography>
     </Container>}

    </Box>
  );

  return (
    <div>
      {[ 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Details</Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            { list(anchor)}
          </Drawer>

        </React.Fragment>
      ))}
    </div>
  );
}
