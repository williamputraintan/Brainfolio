import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import theme from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';

import './new-pf.css'

import PF_Timeline from './portfolio-timeline';
import PF_Body from './portfolio-body';
const useStyles = makeStyles(() => ({
    pf_container:{
        maxWidth: "xl",
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

export default function New(){
    var classes = useStyles();
    return(
        <div>

            <Container className="portfolio-template">

                <div class="grid-container">
                    <div class="picture">
                        <Avatar src={require('../../images/portfolio-profilepic/arthursetiawan.jpg')} className = {classes.large} />
                    </div>
                    <div class="profile">
                        <Typography variant="h4"> <b> Daniel Andrews </b></Typography>
                        <Typography variant="h6"> <b> Victoria Premier </b></Typography>
                        <br/>
                        <Typography> Location: Melbourne, Australia </Typography>
                        <Typography> Ph.: 048592847 </Typography>
                        <Typography> Links: <a href="github.com">github.com</a> </Typography>

                    </div>
                    <div class="edit1">
                        <Button className={classes.button}>Edit Profile</Button>
                    </div>
                    <div class="edit2">
                        <Button className={classes.button}>Edit Portfolio</Button>
                    </div>                    
                </div>
                
            </Container>
            <hr class="solid"/>
            
            <div class='grid-body'>
                <PF_Timeline/>
                <PF_Body/>
            </div>   
        </div>
    );
}