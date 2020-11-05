import React, { useState, useContext ,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {useTransition, animated} from 'react-spring'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import AxiosInstance from '../utils/axios'
import { UserContext } from '../context/user.context'
import CardProject from '../components/DisplayAllProject/DisplayCard';
import AddCard from '../components/DisplayAllProject/AddCard';
import allProjectDark from '../images/allProject/allProjectDark.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        minHeight: "100vh",
      },
      minHeight:'100vh'
    },
    image: {
      width:"400px",
    },
    rowImageGrid:{
      display: 'grid',
      alignItems: 'center',
      justifyItems:'center'
    },
    sec2root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      height: '280px'
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    gridListTile: {
      height:'250px'
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    cardRoot: {
      height: '250px',
      padding:0,
    },
    firstRow:{
      height: '55vh', 
      width:'100%', 
      padding:'10%'
    }
}));


export default function DisplayAllProjectsController() {

    const classes = useStyles();
    const {state} = useContext(UserContext);
    

    //config header
    const config = {
        headers: { Authorization: `Bearer ${state.token}` }
    };

    const [allProjects, setAllProjects] =  React.useState([]);

    useEffect(() => {
        AxiosInstance.get(
          "/projects/",
          config
          )
        .then((response) => {
          const responseData = response.data;
          setAllProjects(responseData);
          console.log(responseData);
        })
      },[]);
      const transitions = useTransition(allProjects, item => item.key, {
      from: { transform: 'translate3d(0,-40px,0)' },
      enter: { transform: 'translate3d(0,0px,0)' },
      })

      const listTheme = createMuiTheme({
        overrides: {
          MuiGridListTile: {
            root: {
                height:'250px'
              }
            },   
          },
      });

    return (
      <ThemeProvider theme={listTheme}>
        <div className={classes.root}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className={classes.firstRow}>
                <Grid
                  item
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={12}
                >
                  <Grid item xs={6} alignContent='center'>
                    <Typography variant="h3" gutterBottom className={classes.title}>
                      Your Projects
                    </Typography> 
                  </Grid>
                  <Grid item xs={6} className={classes.rowImageGrid} >
                    <img src={allProjectDark} className={classes.image}/>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.sec2root}>
                <GridList className={classes.gridList} cols={2.5} style={{height:'auto'}}>
                  {transitions.map(({ item, props, key }) => (
                    <GridListTile style={{height:'250px'}} >
                      <div >
                        <CardProject data={item}/>
                      </div>
                    </GridListTile>
                  ))}
                </GridList>
              </div>
              <AddCard/>
            </Grid>
          </Container>
        </div>
        </ThemeProvider>
    )
}

