import React, {useRef, useContext, useState, Suspense} from 'react'
import {Grid ,Avatar, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import {useParams} from "react-router";
import { format, parseISO  } from "date-fns";


// Dark Mode imports
import DarkTheme from "../utils/theme/DarkTheme";
import MinimalTheme from "../utils/theme/MinimalTheme"
import { makeStyles ,createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';


import AxiosInstance from "../utils/axios";
import Link from '@material-ui/core/Link';
import axios from 'axios'

import SkeletonCard from "../common/SkeletonCard";
import { UserContext } from '../context/user.context'


//Lazy - Load components
const DescriptionController = React.lazy(() => import('./Project/DescriptionController'));
const AuthorController = React.lazy(() => import('./Project/AuthorController'));
const FileController = React.lazy(() => import('./Project/FileController'));
const VideoController = React.lazy(() => import('./Project/VideoController.jsx'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background,
    [theme.breakpoints.up('sm')]: {
      minHeight: "100vh",
    }
  },
  author:{
    // backgroundColor: theme.palette.bacgroundAccent,
    // backgroundColor: "white",
    color: theme.palette.text.primary,
    width:"100%",
    padding: theme.spacing(3,0,3)
    // borderRadius: 3
  },
  background: {
    // backgroundColor: "#303030"
  },
  description: {
    backgroundColor: theme.palette.bacgroundAccent,
    color: theme.palette.text.secondary,
    width:"100%",
    padding: theme.spacing(4,4,0),
    // borderRadius: 3
  },
  title:{
    backgroundColor: theme.palette.titleBgAccent,
    color: theme.palette.text.primary,
    // opacity: "70%",
    // transparancy: "90%",
    width:"100%",
    padding: theme.spacing(4,4,4),
    margin: theme.spacing(4,0,0),
    [theme.breakpoints.down('xs')]:{
      margin: theme.spacing(3,0,0)
    }
  },
  files:{
    backgroundColor: theme.palette.bacgroundAccent,
    color: theme.palette.text.primary,
    width:"100%",
    padding: theme.spacing(3,5,5),
  },
  video:{
    backgroundColor: theme.palette.bacgroundAccent,
    color: theme.palette.text.primary,
    width:"100%",
    padding: theme.spacing(3,0,3),
  },
  pad: {
    padding: theme.spacing(3,4,3),
  }
}));

function ProjectController() {

  const classes = useStyles();
  const {state} = useContext(UserContext);

  //config header
  // const config = {
  //     headers: { Authorization: `Bearer ${state.token}` }
  // };

  const { pathname } = useLocation();
  console.log("Pathname "+ pathname);

  const theme = useTheme();
  

  console.log("USRRR "+ JSON.stringify(state));
  const [project,setProject] = useState({
    contributor: [],
    projectFileName: [],
    _id: "",
    username: "",
    description:"",
    github: "",
    endDate: "",
    isPublic: Boolean,
    onGoing: Boolean,
    startDate: "",
    title: "",
    youtubeLink:""
  })

  React.useEffect(() => {
    const source = axios.CancelToken.source();
   
    AxiosInstance
      // .get(`/public${pathname}`,config)
      .get(/public/+pathname.slice(1,))
      // .get(/public/+"project/franklind/5fa007f33f1365000329f3e6")
      .then(response => {
        const data = response?.data;
        if(data){
          setProject({
            username: data?.username,
            title: data?.title,
            contributor: data?.contributor,
            _id:data?._id,
            projectFileName:data?.projectFileName,
            description: data?.description,
            github: data?.github,
            isPublic: data?.isPublic,
            onGoing: data?.onGoing,
            startDate: data?.startDate,
            youtubeLink: data?.youtubeLink


          })
        }
        

    //     if(backgroundRef.current){
    //       backgroundRef.current.style.backgroundColor = `url(backgroundImageName)`;
    //     }
      })
    console.log("PORJ "+project)
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  },[])

  // console.log(project);
  // console.log(project);
  // console.log(project.projectFileName)

  function showVideo(url){
    if (url) {
      return (
        <Grid container item xs={12}
         className={classes.video}>
          <VideoController url={project.youtubeLink}/>
        </Grid>
      )
    }
  }

  function showDate(data) {
    if (data.startDate && data.endDate) {
      return (
        <Typography variant="h5" align="Left"> 
        {format(parseISO(data.startDate), "MMMM yy")} 
        &nbsp;&nbsp; - &nbsp;&nbsp; 
        {format(parseISO(data.endDate), "MMMM yy")}
        </Typography>
      )
    }
    return (<></>)
  }
  return (
      <Suspense fallback={SkeletonCard}>
        <div className={classes.root}>
            <Container maxWidth="lg" >
              <Grid container >
                <Grid container>
                  {/* title */}
                  <Grid item xs={12} sm={12}
                    className={classes.title}
                  >
                    <Typography variant="h3" align="Left">
                      <b>{project.title}</b>
                    </Typography>
                    {showDate(project)}
                  </Grid>
                  
                  <Grid container item xs={12} sm={12} md={12}
                    className = {classes.description}
                  >
                    <DescriptionController data={project.description}/>   
                  
                    
                    {showVideo(project.youtubeLink)}

                  </Grid>
                </Grid>

                <Grid container item xs={12} sm={12} md={12}
                  className = {classes.author}
                >
                  <AuthorController data={project.contributor}/>
                </Grid>

                <Grid container item xs={12}
                className={classes.files}
                >
                  <FileController data={project.projectFileName}/>
                </Grid>
              </Grid>
            </Container>

        </div>
        
      </Suspense>
  )
  
  
}



export default ProjectController
