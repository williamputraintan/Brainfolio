import React, { useContext ,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import AxiosInstance from '../utils/axios'
import { StoreContext } from '../context/store.context';
import CardProject from '../components/DisplayAllProject/DisplayCard';
import AddCard from '../components/DisplayAllProject/AddCard';
import allProjectDark from '../Assets/images/allProjectDark.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        minHeight: "100vh",
      },
      minHeight:'100vh'
    },
    image: {
      [theme.breakpoints.up('sm')]:{
        width:"400px",
      },
      [theme.breakpoints.down('xs')]:{
        width:"300px",
      },
      
    },
    rowImageGrid:{
      display: 'grid',
      alignItems: 'center',
      justifyItems:'center',
      [theme.breakpoints.up('sm')]:{
        width:'40%',
        height:'100%', 
        float:'right',
      },
      [theme.breakpoints.down('xs')]:{
        width:'100%',
        height:'100%', 
      },
    },
    sec2root: {

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
    firstRow:{
      height: '55vh', 
      width:'100%', 
      padding:'10%'
    },
    allTitle:{
      [theme.breakpoints.up('sm')]:{
        width:'50%',
        height:'100%', 
        float:'left',
      },
      [theme.breakpoints.down('xs')]:{
        width:'100%',
        height:'100%', 
      },
    }
}));


export default function DisplayAllProjectsController() {

    const classes = useStyles();
    const {state} = useContext(StoreContext);
    const img = [
      'https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w',
      'https://images.pexels.com/photos/5253574/pexels-photo-5253574.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      'https://images.pexels.com/photos/2317711/pexels-photo-2317711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/2317711/pexels-photo-2317711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/2317711/pexels-photo-2317711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/2317711/pexels-photo-2317711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w',
      'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      'https://images.pexels.com/photos/2317710/pexels-photo-2317710.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      'https://images.pexels.com/photos/983200/pexels-photo-983200.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    ]
    function getImg(index){


      const num = index%(img.length);
      return img[num]

    }
    //config header
    const config = {
        headers: { Authorization: `Bearer ${state.user.token}` }
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
      // const transitions = useTransition(allProjects, item => item.key, {
      // from: { transform: 'translate3d(0,-40px,0)' },
      // enter: { transform: 'translate3d(0,0px,0)' },
      // })
  
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
                  <Grid item alignContent='center' classes={classes.allTitle}>
                    <Typography variant="h3" gutterBottom className={classes.title}>
                      Your Projects
                    </Typography> 
                  </Grid>
                  <Grid item className={classes.rowImageGrid} >
                    <img src={allProjectDark} className={classes.image}/>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.sec2root}>
                <GridList className={classes.gridList} cols={3.5} style={{height:'auto'}}>
                  {allProjects.map((item, index ) => (
                    <GridListTile style={{height:'250px'}} >
                      <div >
                        <CardProject data={item} img={getImg(index)}/>
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
