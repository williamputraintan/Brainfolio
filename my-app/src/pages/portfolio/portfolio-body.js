import React from 'react';
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
import theme from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';


import './new-pf.css'
import PF_Experience from './experience';
import PF_Education from './education';
import PF_Skill from './skill';
import PF_Project from './project';

const useStyles = makeStyles(() => ({
    pf_container:{
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        maxWidth: "xl",
        // height: 1234,
        backgroundImage: `url(${"./blue-diamond-bg.png"})`,
        
        
    },
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

    // paper: {
    //     textAlign: 'center',
    //     color: theme.palette.text.paper,
    // },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "white"
      }
    
  }));

export default function PF_Body(){
    var classes = useStyles();
    return(
        <div class="pf">

            <Container className={classes.paper}>
                <Typography variant="h4"> Description</Typography>
                <br/>

                <Typography theme="theme">
                    I'm diligent, love to connect with new people and do teamwork. 
                    cool right? Lets meet up and talk!
                    <br/>
                    Looking forward to see you soon!
                </Typography>
            </Container>
            <hr class="solid"/>

            <PF_Experience/>
            <hr class="solid"/>

            <PF_Education/>
            <hr class="solid"/>

            <PF_Skill/>
            <hr class="solid"/>

            <PF_Project/>

        </div>
    );
}