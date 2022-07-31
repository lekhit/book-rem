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
import {BASE_URL} from '../utils/constants'
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
function convert_gen(item){

  const regex = /'(.+?)'/gm;

  // Alternative syntax using RegExp constructor
  // const regex = new RegExp('\'(.+?)\'', 'gm')
  
  const str =item
  let m,arr=[];
  
  while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {if(groupIndex===1) arr.push(match)
          //console.log(`Found match, group ${groupIndex}: ${match}`);
      });

  }

  return arr;
}

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(() =>
    props.open ? true : false
  );
const is_login=useAppContext();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLike= async ()=>{
    setLike(!like)
   is_login.setLikes((data)=>{
      return {...data,[props.article.index]:like}
    })
    console.log(is_login.likes)
const data={}
data.likes=is_login.likes
data.username=is_login.username
data.index=props.article.index
const url=`${BASE_URL}/api/like_book2`
let response
if(!like) {
response= await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })}
  else {
    response =await fetch(url +'?'+ new URLSearchParams(data))
  }
  

const rs=await response.json()
console.log(rs,is_login.likes)
  }
const [like,setLike]=React.useState(is_login.likes[props.article.index]?is_login.likes[props.article.index]:false)
  //const  arr=convert_gen(props.article.genres);

  return (
    <>
   
    <Card sx={{ maxWidth: 345, border: 0.5 }}>
      
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
      />
      
      <CardMedia
        component="img"
        image={
          !props.article.coverImg
            ? 'https://resizer.glanacion.com/resizer/kZdiizTP2IWRah3Y4Psz6YKzgbY=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/GF4WDVMYGNDKBCMWR7KXNFOE34.jpg'
            : props.article.coverImg
        }
        alt="Paella dish"
      />

      <CardContent>
       
      <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          
          <Rating name="half-rating-read" defaultValue={props.article.rating} precision={0.1} readOnly />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.article.likedPercent}%
        </Typography>
      
        </Grid>
      
      </CardContent>


      <CardActions disableSpacing>
    <Grid container
          direction="column"
          justifyContent="space-between"
          alignItems="center">
      
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Drawer book_index={props.article.index}/>
      
          
      <Link href={`/recommender?book_index=${props.article.index}`}>
            <Button variant="contained">
              {' '}
              Similar <ArrowForwardIosIcon />
            </Button>
          </Link>
        </Grid>
       {is_login.login && <Stack direction="row"
  justifyContent="space-between"
  alignItems="center"
  spacing={2}>
        <IconButton onClick={handleLike} color={like ? 'error':'inherit'} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton  aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        </Stack>}
       </Grid>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
       
          <Typography paragraph>{props.article.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
