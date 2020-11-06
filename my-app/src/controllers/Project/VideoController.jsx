import React from 'react';
import ReactPlayer from 'react-player/youtube'
import { makeStyles } from '@material-ui/core/styles';
import {Grid ,Avatar, Button, Typography} from '@material-ui/core';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    cellHeight: '300px'
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  reactPlayer:{
    position: "absolute",
    top: "0",
    left: "0"
  },
  playerWrapper: {
    position: "relative",
    paddingTop: "56.25%"
  },
  // videoLabel:{
  //   color: "white",
  //   width:"100%",
  //   padding: theme.spacing(2,2,2,0)
  // },
  videoGrid: {
    padding: theme.spacing(1,10,3),
    [theme.breakpoints.down('md')]:{
      padding: theme.spacing(1,7,3)
    },
    [theme.breakpoints.down('sm')]:{
      padding: theme.spacing(1,5,3)
    },
    [theme.breakpoints.down('xs')]:{
      padding: theme.spacing(1,1,3)
    }
  }
}));

export default function VideoController(props) {
  const classes = useStyles();
  const url = props.url;

  return (
    <Container>
        <Grid item xs={12} className={classes.videoGrid}>
            <div className={classes.playerWrapper}>
                <ReactPlayer
                className={classes.reactPlayer}
                url={url}
                width='100%'
                height='100%'
                />
            </div>
        </Grid>
    </Container>
  );
}