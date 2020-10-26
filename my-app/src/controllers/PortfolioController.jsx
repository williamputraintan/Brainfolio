import React, {useRef, useState, Suspense} from 'react'
import {Grid ,Avatar, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SectionMenu from "../components/Portfolio/MenuSection"; 
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

// Dark Mode imports
import DarkTheme from "../utils/theme/DarkTheme";
import { makeStyles ,createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import AxiosInstance from "../utils/axios";
import Link from '@material-ui/core/Link';
import axios from 'axios'

import SkeletonCard from "../common/SkeletonCard";



//Lazy - Load components

const DescriptionController = React.lazy(() => import('./Porfolio/DescriptionController'));
const ExperienceController = React.lazy(() => import('./Porfolio/ExperienceController'));
const EducationController = React.lazy(() => import('./Porfolio/EducationController'));
const ProjectController = React.lazy(() => import('./Porfolio/ProjectController'));
const SkillController = React.lazy(() => import('./Porfolio/SkillController'));


// images
const headerImg = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
const img = 'https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      minHeight: "100vh",
    }
  },
  large: {
    width: 256,
    height: 256,
    margin: "auto",
    marginBottom: 24,
    boxShadow: theme.shadows[3],
    [theme.breakpoints.up('sm')]: {
      width: 184,
      height: 184,
    }
  },
  headerBackground: {
    backgroundImage: `url(${headerImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:" cover",
    backgroundBlendMode: "overlay",
    backgroundColor: "#34343477",
    width:"100%",
    display: "flex",
    
    alignItems: "center",
    padding: theme.spacing(8),
  
    [theme.breakpoints.down('sm')]: {
      minHeight:"50vh",  
      justifyContent: "center",
  
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 240,
      justifyContent: "flex-start",
    }
  },
  name: {
    fontWeight: 700,
    color: "#FCFCFC",
    textTransform: "Capitalize"
  },
  caption: {
    color: "#FCFCFC"
  },
  details: {
    fontWeight: 700,
    color: "#FCFCFC"
  },
  textWrapper:{
    [theme.breakpoints.down('sm')]: {
      width: 256,
      margin: "auto"
    }
  },
  portfolioSection:{
    flexGrow: 1,
    
    "& > div": {
      margin: theme.spacing(2)
    }
  },
  portfolioItems:{
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      "& > div": {
        margin: 0
      },
      "& > div > *": {
        marginBottom: theme.spacing(4),
      } 
    },
    [theme.breakpoints.down('sm')]: {
      "& > div > *": {
        marginBottom: theme.spacing(1),
      } 
    },
    
    
  },
  actionCenter: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));



function PortfolioController() {

  const classes = useStyles();
  const backgroundRef = useRef(null);

  const { pathname } = useLocation();
  const lastPath = pathname.split("/").slice(-1)[0] 

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  
  const [profile,setProfile] = useState({
    username: "",
    title: "",
    address: "",
    phone: "",
    email:"",
    github: "",
    backgroundImageName: "",
    profileImageName: ""
  })

  React.useEffect(() => {
    const source = axios.CancelToken.source();
   

    AxiosInstance
      .get(`/public/profile/${lastPath}`)
      .then(response => {
        const data = response?.data;
        if(data){
          setProfile({
            username: data?.username,
            title: data?.title,
            address: data?.address,
            phone:data?.phone,
            email:data?.email,
            linkedIn: data?.linkedIn,
            backgroundImageName: data?.backgroundImageName,
            profileImageName: data?.profileImageName
          })
        }
        

        if(backgroundRef.current){
          backgroundRef.current.style.backgroundColor = `url(backgroundImageName)`;
        }
      })
    
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  },[])

  
  // Use ThemeProvider and CSSbaseline for darkmode
  return (
      <Suspense fallback={SkeletonCard}>
        <div className={classes.root}>
          <Grid container>
            <Grid 
              ref={backgroundRef}
              container item xs={12} 
              className={classes.headerBackground}>
              <Grid container item xs ={12} sm={4} justify="center">
                <Avatar src={img || profile.backgroundImage} className = {classes.large}/>
              </Grid>
              <Grid container item xs={12} sm={8} justify="flex-start">
                <div className={classes.textWrapper}>
                  <Typography className={classes.name} variant="h3"> {profile.username}</Typography>
                  {profile.title && <Typography className={classes.caption} variant="h5"> {profile.title}</Typography>}
                  <br/>
                  {profile.address && <Typography className={classes.details} > Location: {profile.address} </Typography>}
                  {profile.phone && <Typography className={classes.details} > Ph.: {profile.phone} </Typography>}
                  {profile.email && <Typography className={classes.details} > Email:{profile.email}</Typography>}
                </div>
              </Grid>
            </Grid>
            <Paper className={classes.actionCenter} elevation={1}>
              <a
                href="LinkedIn.com">
                  linkedIn
              </a>
            </Paper>
            <Grid container item xs={12}>
              {matches && <SectionMenu />}
              <section className={classes.portfolioItems}>
                <Container maxWidth="md">
                  <DescriptionController user={lastPath}/>
                  <ExperienceController user={lastPath}/>
                  <EducationController user={lastPath}/>
                  <SkillController user={lastPath}/>
                  <ProjectController user={lastPath}/>
                </Container>
              </section>
            </Grid>
          </Grid>
      

        </div>
    </Suspense>
  )
  
  
}



export default PortfolioController
