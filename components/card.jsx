import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Box, Grid } from '@mui/material';
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

import Link from 'next/link';

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
  const [expanded, setExpanded] = React.useState(() =>
    props.open ? true : false
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
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
        <Typography variant="body2" color="text.secondary">
          {props.article.likedPercent}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Link href={`/book?book_index=${props.article.index}`}>
            <Button variant="contained">
              {' '}
              More <ArrowForwardIosIcon />
            </Button>
          </Link>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.article.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
