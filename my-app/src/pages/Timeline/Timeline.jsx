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
    background: 'linear-gradient(90deg, #041e42,#5C788F)',
  }

});

const datas = [
  {
    "project_id":"a",
    "Title" : "Design Patterns",
    "Description" : "Illustrating concept of design pattern using C programming",
    "Category" : "Computer Science",
    "Contributor" : ["Ralph Johnson","Jackson Smith"]

  },
  {
    "project_id":"b",
    "Title" : "Clean Code",
    "Description" : "A program that convert code to be more efficient removing unecessary codes",
    "Price" : 43.15,
    "Category" : "Computers",
    "Contributor" : ["Robert C. Martin","Jackson Smith"]
  },
  {
    "project_id":"b",
    "Title" : "Website design",
    "Description" : "Some portoflio of website",
    "Price" : 43.15,
    "Category" : "Computers",
    "Contributor" : ["Robert C. Martin","Jackson Smith"]
  }

];

const authors = [1,2,3,4]

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        // justify="center"
        // alignItems="left"
        spacing={1}
      >
      {datas.map((data) => (
        <Grid item xs={8} container>
          <Grid item xs={12}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.Title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {data.Description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>



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


        </Grid>
      ))}

      </Grid>


 
    </div>
    </div>

  );
}
