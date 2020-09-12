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

import ProjectDisplay from '../components/Timeline/ProjectDisplay.jsx'
import PeopleDisplay from '../components/Timeline/PeopleDisplay.jsx'


const useStyles = makeStyles({
  root: {

    maxWidth: '90%',

    margin: 'auto',
    paddingTop: 30
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  bgcolor:{
    background: 'linear-gradient(90deg, #041e42,#5C788F)',
    minHeight: '100vh',
  },
  people:{
    position: "sticky"
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
  },


];

const authors = [1,2,3,4]

export default function MediaCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.bgcolor}>

      <div className={classes.root}>
        <Grid
          container
          direction="row"
          spacing={3}
          >

          <Grid 
            item
            container
            direction="column"
            // justify="center"
            // alignItems="left"
            spacing={2}
            xs={8}
          >
          {datas.map((data) => (
            <Grid item>
              <ProjectDisplay projectDetails={data}/>
            </Grid>
          ))}

          </Grid>
            

          <Grid
            item
            container
            direction="column"
            spacing={1}
            xs={4}
            className={classes.position}
          >
            <Grid item className={classes.position}>
              <PeopleDisplay/>
              <PeopleDisplay/>
              <PeopleDisplay/>
     
            </Grid>

          </Grid>
      
        </Grid>

  
      </div>

    </div>

  );
}
