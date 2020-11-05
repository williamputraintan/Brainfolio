import React, { useState, useContext ,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import {useTransition, animated} from 'react-spring'

import AxiosInstance from '../utils/axios'
import { UserContext } from '../context/user.context'
import CardProject from '../components/DisplayAllProject/DisplayCard';
import AddCard from '../components/DisplayAllProject/AddCard';
import AllProjectLight from '../common/SVG/AllProjectLight.js'
import AllProjectLogo from '../common/AllProjectLogo.png'
import allProjectDark from '../images/allProject/allProjectDark.png'

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
    testing:{
      backgroundColor:"#FF0000",
      
    },
    rowImageGrid:{
      display: 'grid',
      alignItems: 'center',
      justifyItems:'center',
      minHeight:'100vh',
    },
    DataGrid:{
      alignItems: 'center',
      justifyItems:'center',
      margin:'-12px'
    },
    allCardGrid:{
      // display: 'grid',
      alignItems: 'center',
      justifyItems:'center',
      height: '600px',
      overflow: 'auto',
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
    return (
        <div className={classes.root}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >

              {/* first row */}
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
              >
                <Grid item xs={6} alignContent='center'>
                  <Typography color="textSecondary" variant="h3" gutterBottom>
                    Your Projects
                  </Typography> 
                </Grid>
                <Grid item xs={6} className={classes.rowImageGrid} >
                  <img src={allProjectDark} className={classes.image}/>
                </Grid>
              </Grid>

              {/* Second Row */}
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
              >
                    {transitions.map(({ item, props, key }) =>
                    <Grid item md={4} xs={12} >
                      <animated.div key={key} style={props}>
                        
                        <CardProject data={item}/>
    
                      </animated.div>
                    </Grid>
                    )}




              </Grid>

              <AddCard/>





            





            </Grid>

          </Container>

    
          
          {/* <Grid
            container
            direction="row"
            justifyItems="center"
            alignItems="center"
          >
            logo
            <Hidden only='md' mdDown>          
              <Grid item md={4} className={classes.rowImageGrid} >
                <img src={AllProjectLogo} className={classes.image}/>
              </Grid>
            </Hidden>
            <Grid container item md={8} xs={12} spacing={3} alignItems="center" justify="center" >

              <Grid item xs={12} alignContent='center'>
                <Typography color="textSecondary" variant="h3" gutterBottom>
                  Your Projects
                </Typography> 
              </Grid>
                  <Grid
                    xs={12}
                    item
                    container
                    direction="row"
                    className = {classes.allCardGrid}
                    spacing={4}
                  >
                    {transitions.map(({ item, props, key }) =>
                    <Grid item md={4} xs={12} >
                      <animated.div key={key} style={props}>
                        
                        <CardProject data={item}/>
    
                      </animated.div>
                    </Grid>
                    )}
                  </Grid>

              <Grid item xs={1}>
                <AddCard/>
              </Grid>
            </Grid>

            
          </Grid> */}
        </div>
    )
}
