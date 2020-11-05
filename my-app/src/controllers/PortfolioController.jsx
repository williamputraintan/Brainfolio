import React, {useRef, useState, Suspense} from 'react'
import {Grid ,Avatar, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SectionMenu from "../components/Portfolio/MenuSection"; 
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

// Dark Mode imports
import DarkTheme from "../utils/theme/DarkTheme";
import { makeStyles, lighten } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import AxiosInstance from "../utils/axios";
import Link from '@material-ui/core/Link';
import axios from 'axios'

import SkeletonCard from "../common/SkeletonCard";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { setUserLoading } from '../context/actions/auth.actions';



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
  wrapper:{
    padding: 0
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
    backgroundColor: theme.palette.text.divider,
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
    color: theme.palette.text.primary,
    textTransform: "Capitalize"
  },
  caption: {
    color: theme.palette.text.secondary
  },
  details: {
    fontWeight: 700,
    color: theme.palette.text.secondary
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
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      "& > div": {
        margin: 0
      },
      "& > div > *": {
        marginBottom: theme.spacing(4),
      } 
    },
    [theme.breakpoints.down('sm')]: {
      "& > div > *": {
        marginTop: theme.spacing(4),
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

  const { search, pathname } = useLocation();
  const lastPath = pathname.split("/").slice(-1)[0] 
  const destinationPath = lastPath + search;
  console.log('destipath', destinationPath);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  
  
  const [profile,setProfile] = useState({
    username: "",
    title: "",
    address: "",
    phone: "",
    email:"",
    description: "",
    github: "",
    fullname: "",
    backgroundImageLink: "",
    profileImageLink: ""
  })

  React.useEffect(() => {
    const source = axios.CancelToken.source();
   
    console.log(lastPath)
    AxiosInstance
      .get(`/public/profile/${lastPath}`)
      .then(response => {
        console.log("its here")
        const data = response?.data
        const user = response?.data.user;
        const profile2 = response?.data.user.profile;
        console.log(profile2)
        if(data.user){
          console.log("its hereheheh")
          console.log(user.username)
          setProfile({
            username: user.username,
            filename: profile2.fullname,
            title: profile2.title,
            address: profile2.address,
            phone: profile2.phone,
            email: profile2.displayEmail,
            linkedIn: profile2.linkedIn,
            github: profile2.github,
            description: profile2.description,
            backgroundImageLink:response?.data.backgroundImageLink,
            profileImageLink: response?.data.profileImageLink
          })
        }
        console.log("its here123")
        console.log(profile)

        if(backgroundRef.current){
          backgroundRef.current.style.backgroundColor = `url(backgroundImageLink)`;
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
      <Suspense fallback={<SkeletonCard/>}>
        <div className={classes.root}>
          <Grid container>
          <Container className={classes.wrapper} maxWidth="lg">
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
            <Paper className={classes.actionCenter} elevation={1} square>
            <Button
              color="secondary"
              className={classes.button}
              startIcon={<LinkedInIcon />}
            >
              LinkedIn
            </Button>

            </Paper>
            <Grid container item xs={12}>
              {matches && <SectionMenu />}
              <section className={classes.portfolioItems}>
                {

                }
                <Container maxWidth="lg">
                  <DescriptionController user={destinationPath}/>
                  <ExperienceController user={destinationPath}/>
                  <EducationController user={destinationPath}/>
                  {/* <SkillController user={destinationPath}/> */}
                  <ProjectController user={destinationPath}/>
                </Container>
              </section>
            </Grid>
            </Container>
          </Grid>
      </div>
    </Suspense>
  )
  
  
}



export default PortfolioController
