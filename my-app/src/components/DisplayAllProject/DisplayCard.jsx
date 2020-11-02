import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minHeight: '250px',
    maxheight: '250px',
    padding:0,
  },
  media: {
    height: 140,
  },
});

export default function CardProject(props) {
    const classes = useStyles();
    console.log('propsdata = ', props.data);
    const data = props.data;
    const link = "https://brainfolio.herokuapp.com/project/" + data._id

    const img = 'https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg';



    return (
      <Card className={classes.root}>
        <CardActionArea href={link}>
          <Container className={classes.root}>
          <CardMedia
            className={classes.media}
            image={img}
            title={data.title}
          />
          <CardContent>
            <Typography noWrap gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography noWrap variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </CardContent>
          </Container>
        </CardActionArea>
      </Card>
    )
}
