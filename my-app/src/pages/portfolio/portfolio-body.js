import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
import AxiosInstance  from "../../utils/axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';




import './new-pf.css'
import PF_Experience from './experience';
import PF_Education from './education';
import PF_Skill from './skill';
import PF_Project from './project';

const useStyles = makeStyles((theme) => ({
    large: {
        // width: "10em",
        // height: "10em",
        width: "180px",
        height: "180px",
        // alignItems: "center"
    },
    profilePicRoot: {
        alignItems: "center", 
        justifyItems: "center",
    },
    button:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
        },
    },
    segment: {
        margin: theme.spacing(3, 0, 0),
        padding: theme.spacing(2)
    },

    lightPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        backgroundColor: "white"
    },
    darkPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        backgroundColor: "#353535"
    },
  }));


// function showDesc() {
//   if (true) {
//     return()
//   }
// }

function showExp(darkmode){
  if (true) {
    return (<PF_Experience darkMode={darkmode}/>);
  }
}

function showEducation(darkmode){
  if (true) {
    return (<PF_Education darkMode={darkmode}/>);
  }
}

function showSkill(darkmode){
  if (true) {
    return(<PF_Skill darkMode={darkmode}/>);
  }
}

function showProject(darkmode){
  if (true) {
    return (<PF_Project darkMode={darkmode}/>);
  }
}

// function showCustom1(darkmode){
//   if (false) {
//     return(<PF_Custom1/>);
//   }
// }

// function showCustom2(darkmode){
//   if (false) {
//     return (<PF_Custom2/>);
//   }
// }

export default function PF_Body(preference){
    var classes = useStyles();
    const darkmode = preference.darkMode;
    let flag = true
    let loc = window.location.pathname;
    const [pf,setPf] = React.useState([])
    function getUsername(path) {
        const res = path.split("/");
        return res[2];
    }

    if (flag){
        AxiosInstance.get("public/profile/"+getUsername(loc))
        .then(res => {
        setPf(res.data);
        })
        flag = false;
    }
    return(
        <div class="pf">
            <Divider />

            <Card id="description" className={ darkmode ? classes.darkPaper :classes.lightPaper }>
            
    <Typography variant="h4"> Descrption</Typography>
            <br/>

            <Typography theme="theme">
            {pf.description}
            </Typography>
            </Card>

            {showExp(darkmode)}
            {showEducation(darkmode)}
            {showSkill(darkmode)}
            {showProject(darkmode)}
            {/* {showCustom1()}
            {showCustom2()} */}

        </div>
    );
}