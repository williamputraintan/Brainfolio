import React, { useState, useContext ,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import AxiosInstance from '../utils/axios'
import { UserContext } from '../context/user.context'
import CardProject from '../components/DisplayAllProject/DisplayCard';
import AddCard from '../components/DisplayAllProject/AddCard';
import AllProjectLight from '../common/SVG/AllProjectLight.js'
import AllProjectLogo from '../common/AllProjectLogo.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        minHeight: "100vh",
      }
    },
    image: {
      width:"450px",
    },
    testing:{
      backgroundColor:"#003a25",
      
    },
    rowImageGrid:{
      display: 'grid',
      alignItems: 'center',
      justifyItems:'center',
      minHeight:'100vh',
    },
    DataGrid:{
      
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

    return (
        <div className={classes.root}>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Hidden only='sm' smDown>

            
              <Grid item xs={6} className={classes.rowImageGrid} >
                <img src={AllProjectLogo} className={classes.image}/>
              </Grid>
            </Hidden>

            <Grid container item md={6} xs={12} spacing={3} alignItems="center" justify="center">
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="h3" gutterBottom>
                  Your Projects
                </Typography> 
              </Grid>   
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
                spacing ={4}
              >
                <Container>
                  <Grid
                    item
                    container
                    direction="row"
                    className = {classes.allCardGrid}
                    spacing={4}
                  >
                    {allProjects.map(res=>(
                    <Grid item sm={6} xs={12} >
                      <CardProject data={res}/>
                    </Grid>
                    ))}
                  </Grid>
                </Container>

                <Grid item>
                  <AddCard/>
                </Grid>
                    
              </Grid>
             
            </Grid>
          </Grid>            
        </div>
    )
}
