import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const useStyles = makeStyles({
  root: {
    
    maxWidth: '90%',
    margin: 'auto',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  background:{
    // background: 'linear-gradient(90deg, #041e42,#5C788F)',
  }

});

const authorDisplay = authors => {
  const classes = useStyles();

  return (
    <div>
      <GridList 
        className={classes.gridList} 
        cols={3}
        cellHeight='auto'
      >
        {authors.map((author) => (
          <GridListTile key={author}>
            <CardActionArea>
              <Card>
                  <CardHeader
                  avatar={
                      <Avatar className={classes.avatar}>
                      </Avatar>
                  }
                  title="Name | Author"
                  subheader="Email: author@email.com"
                  />
              </Card>
            </CardActionArea>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default authorDisplay
