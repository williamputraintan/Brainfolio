import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 750,
  },
  cardRoot: {
    margin: 'auto',
    maxWidth: 750,
    maxHeight: 200,
  },
  media: {
    height: 140,
  },
});

const datas = [
  {
    "Title" : "Design Patterns",
    "Price" : 54.93,
    "Category" : "Computers",
    "Contributor" : "Ralph Johnson"

  },
  {
    "Title" : "Clean Code",
    "Price" : 43.15,
    "Category" : "Computers",
    "Contributor" : "Robert C. Martin"
  }

];

export default function MediaCard() {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>

      {datas.map((data) => (

          <Card className={classes.cardRoot}>
          <CardActionArea href='/signin'>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.Title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Project Description
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Contributor 1
            </Button>
            <Button size="small" color="primary">
              Contributor 2
            </Button>
          </CardActions>
        </Card>


      ))}


 
    </div>

  );
}
