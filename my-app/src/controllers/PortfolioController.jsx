import React, {useRef, useState, useContext, Suspense} from 'react'
import { StoreContext } from '../context/store.context';

import {Grid ,Avatar, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SectionMenu from "../components/Portfolio/MenuSection"; 
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

// Dark Mode imports
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


import axios from 'axios';
import AxiosInstance from "../utils/axios";

import SkeletonCard from "../common/SkeletonCard";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

//Lazy - Load components

const DescriptionController = React.lazy(() => import('./Porfolio/DescriptionController'));
const ExperienceController = React.lazy(() => import('./Porfolio/ExperienceController'));
const EducationController = React.lazy(() => import('./Porfolio/EducationController'));
const ProjectController = React.lazy(() => import('./Porfolio/ProjectController'));
const SkillController = React.lazy(() => import('./Porfolio/SkillController'));
const Custom1Controller = React.lazy(() => import('./Porfolio/Custom1Controller'));
const Custom2Controller = React.lazy(() => import('./Porfolio/Custom2Controller'));

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
    backgroundColor: "#343434",
    width:"100%",
    display: "flex",
    
    alignItems: "center",
   
  
    [theme.breakpoints.down('sm')]: {
      minHeight:"50vh",  
      justifyContent: "center",
      padding: `${theme.spacing(2)}px 0px`,
  
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 240,
      justifyContent: "flex-start",
      padding: theme.spacing(8),
    }
  },
  name: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    textTransform: "Capitalize",
    color: "#FAFAFA"
  },
  caption: {
    color: "#FAFAFA"
  },
  details: {
    fontWeight: 700,
    color: "#FAFAFA"
  },
  textWrapper:{
    color:"#FFFFFF",
    [theme.breakpoints.up('xs')]: {
      margin: "auto",
      width: "auto!important",
    },
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
  
  const {state} = useContext(StoreContext);
  const classes = useStyles();
  const config = {
    headers: { Authorization: `Bearer ${state.user.token}` }
  };
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
    profileImageName: "",
    fullname: ""
  })

  React.useEffect(() => {
    const source = axios.CancelToken.source();


    AxiosInstance
      .get(`/public/profile/${lastPath}`, config)
      .then(response => {
        const data = response?.data;
        const user = response?.data.user;
        const profileData = response?.data.user.profile;

        if(data){
          setProfile({
            fullname: user.profile.fullname,
            username: user.username,
            filename: profileData.fullname,
            title: profileData.title,
            address: profileData.address,
            phone: profileData.phone,
            email: profileData.displayEmail,
            linkedIn: profileData.linkedIn,
            github: profileData.github,
            description: profileData.description,
            backgroundImageLink:response?.data.backgroundImageLink,
            profileImageLink: response?.data.profileImageLink
          })
        }
        

        if(backgroundRef.current){
          backgroundRef.current.style.backgroundImage = `url(${response?.data.backgroundImageLink})`;
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
                <Avatar src={profile.profileImageLink || img } className = {classes.large}/>
              </Grid>
              <Grid container item xs={12} sm={8} justify="flex-start">
                <div className={classes.textWrapper}>
                  <Typography className={classes.name} color="inherit" variant="h3"> {profile.fullname||profile.username}</Typography>
                  {profile.title && <Typography className={classes.caption} variant="h5"> {profile.title}</Typography>}
                  <br/>
                  {profile.phone && <Typography className={classes.details} > Ph.: {profile.phone} </Typography>}
                  {profile.email && <Typography className={classes.details} > Email: {profile.email}</Typography>}
                  {profile.address && <Typography className={classes.details} > Address: {profile.address} </Typography>}
                </div>
              </Grid>
            </Grid>
            <Paper className={classes.actionCenter} elevation={1} square>
            {/* show button if there is linkedIn profile */}
            {profile.linkedIn?
              (<Button
              color="primary"
              className={classes.button}
              startIcon={<LinkedInIcon />}
              href= {`https://${profile.linkedIn}`}
              >
              LinkedIn
              </Button>):
              (<></>)
            }
            {/* show button if there is github profile */}
            {profile.github?
              (<Button
                color="primary"
                className={classes.button}
                startIcon={<GitHubIcon />}
                href= {`https://${profile.github}`}
              >
                Github
              </Button>):
              (<></>)
            }
            </Paper>
            <Grid container item xs={12} wrap='nowrap'>
              {matches && <SectionMenu />}
              <section className={classes.portfolioItems}>
                <Container maxWidth="lg">
                  <DescriptionController  user={lastPath}/>
                  <ExperienceController user={lastPath}/>
                  <EducationController user={lastPath}/>
                  <SkillController user={lastPath}/>
                  <ProjectController user={lastPath}/>
                  <Custom1Controller user={lastPath}/>
                  <Custom2Controller user={lastPath}/>
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
