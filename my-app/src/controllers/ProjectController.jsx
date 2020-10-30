import React, {useRef, useState, Suspense} from 'react'
import {Grid ,Avatar, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

// Dark Mode imports
import DarkTheme from "../utils/theme/DarkTheme";
import MinimalTheme from "../utils/theme/MinimalTheme"
import { makeStyles ,createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';


import AxiosInstance from "../utils/axios";
import Link from '@material-ui/core/Link';
import axios from 'axios'

import SkeletonCard from "../common/SkeletonCard";



//Lazy - Load components
const DescriptionController = React.lazy(() => import('./Project/DescriptionController'));
const AuthorController = React.lazy(() => import('./Project/AuthorController'));
const FileController = React.lazy(() => import('./Project/FileController'));
const VideoController = React.lazy(() => import('./Project/VideoController.jsx'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      minHeight: "100vh",
    }
  },
  author:{
    backgroundColor: "#3368B6",
    color: "white",
    width:"100%",
    padding: theme.spacing(3,0,3)
    // borderRadius: 3
  },
  description: {
    backgroundColor: "#3368B6",
    color: "white",
    width:"100%",
    padding: theme.spacing(1,4,3),
    // borderRadius: 3
  },
  title:{
    backgroundColor: "#174BA8",
    width:"100%",
    padding: theme.spacing(3,4,3)
  },
  files:{
    backgroundColor: "#7AA6D2",
    width:"100%",
    padding: theme.spacing(3,4,3),
    // borderRadius: 3
  },
  video:{
    backgroundColor: "#95BEDD",
    width:"100%",
    padding: theme.spacing(3,0,3),
    // borderRadius: 3
  },
  pad: {
    padding: theme.spacing(3,4,3),
  }
}));

function ProjectController() {

  const classes = useStyles();

  const { pathname } = useLocation();
  console.log("Pathname "+ pathname);
  const theme = useTheme();
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
      .get(`/public${pathname}`)
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
    
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  },[])

  // console.log(project);
  console.log(project);
  // console.log(project.projectFileName)
  // Use ThemeProvider and CSSbaseline for darkmode
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
  return (
      <Suspense fallback={SkeletonCard}>
        <div className={classes.root}>
          <Paper>
            <Container maxWidth="md" >
              <Grid container >
                <Grid container>
                  <Grid item xs={12} sm={12}
                    className={classes.title}
                  >
                    <Typography variant="h3" align="Left">
                      {project.title}
                    </Typography>
                    <Typography variant="h5" align="Left"> 
                      {project.startDate} - {project.endDate}
                    </Typography>
                  </Grid>
                  
                  <Grid container item xs={12} sm={12} md={12}
                    className = {classes.description}
                  >
                    <DescriptionController data={project.description}/>   
                  </Grid>
                    
                    {showVideo(project.youtubeLink)}

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
              </Grid>
            </Container>
        </Paper>

        </div>
        
      </Suspense>
  )
  
  
}



export default ProjectController
