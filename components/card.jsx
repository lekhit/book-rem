import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Stack, Card, Box, Grid,Rating } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Drawer from './drawer';
import Link from 'next/link';
import { useAppContext } from '../context/notes/state';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function RecipeReviewCard(props) {

const is_login=useAppContext();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleLike= async ()=>{
    let mydata={};
  await is_login.setLikes((data)=>{
      mydata.likes={...data,[props.article.index]:!data[props.article.index]}
      return mydata.likes
    })

mydata.username=is_login.username

const url=`/api/like_book2`
let response
 {
response= await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mydata),
  })}
  
  


  }
//const  arr=convert_gen(props.article.genres);

  return (
    <>
   
   
   

<Card sx={{width:345 ,height:900, border: 0.5 }}>
<CardMedia
      sx={{width: 345,height : 550}}
        component="img"
        image={
          !props.article.coverImg
            ? 'https://resizer.glanacion.com/resizer/kZdiizTP2IWRah3Y4Psz6YKzgbY=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/GF4WDVMYGNDKBCMWR7KXNFOE34.jpg'
            : props.article.coverImg
        }
        alt="Paella dish"
      /> 
      <Stack
  direction="column"
  justifyContent="flex-end"

>
<CardContent>
      <Rating name="half-rating-read" defaultValue={props.article.rating} precision={0.1} readOnly />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.article.likedPercent}%
        </Typography>
      
          
          
      

      
      </CardContent>
      <CardActions disableSpacing>
      
      <Grid container
            direction="column"
            justifyContent="space-around"
            alignItems="center">
        
{is_login.login && <Stack direction="row">

<IconButton onClick={handleLike} color={is_login.likes[props.article.index] ? 'error':'inherit'} aria-label="add to favorites">
  <FavoriteIcon />
</IconButton>
<IconButton  aria-label="share">
  <ShareIcon />
</IconButton>
</Stack>
}

          <Grid
            container
            direction="row"
            justifyContent="space-between"

          >
            <Drawer book_index={props.article.index}/>
        
            
        <Link href={`/recommender?book_index=${props.article.index}`}>
              <Button variant="contained">
                {' '}
                Similar <ArrowForwardIosIcon />
              </Button>
            </Link>
          </Grid>
  
         
         </Grid>
        </CardActions>




<CardHeader
        // avatar={
        //   <Typography sx={{maxwidth:"20"}} variant="body1" color="red">
        //     {props.article.author}<br/>
        //   </Typography>
        // }
// author,title,coverImg,likedPercent,index,
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.article.title}
        subheader={props.article.author}
      >
        
        </CardHeader>
     


      
      </Stack>

    </Card>
    </>
  );
}
