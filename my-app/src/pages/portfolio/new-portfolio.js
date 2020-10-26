import React from 'react';
import { useEffect, useState} from 'react-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import bgDefaultDark from '../../images/portfolio-jumbotron/grey-diamond.jpg';
import bgDefaultLight from '../../images/portfolio-jumbotron/blue-diamond-bg.png'
import profileImage from '../../images/portfolio-profilepic/arthursetiawan.jpg';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import './new-pf.css'

import PF_Timeline from './portfolio-timeline';
import PF_Body from './portfolio-body';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${headerImg})`
    },
    pf_container:{
        width:"100%",
        backgroundImage: `url(${bgDefaultLight})`,
    },
    large: {
        width: "180px",
        height: "180px",
        // alignItems: "center"
    },
    profilePicRoot: {
        alignItems: "center", 
        justifyItems: "center",
    },
    lightButton:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
        },
    },
    darkButton:{
        backgroundColor:"#353535",
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: "#CDCDCD",
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
        // backgroundColor: "white"
      }
    
  })); 


const img = 'https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg';
const darkmode = true;
const headerImg = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'

export default function New(){

    // const [portfolio, setPortfolio] = useState([]);

    // useEffect(() => {
    //     axios.get("/user/"+username)
    //         .then(res => {
    //             setPortfolio(res.data);
    //         })
    // });

    // const portfolio = {
    //     backgroundImage: url('../../images/portfolio-jumbotron/grey-diamond.jpg'),
    //     backgroundPosition: center center,
    //     backgroundSize: cover,                     /* <------ */
    //     backgroundRepeat: no-repeat,
    //     minWidth:100%
    // }

    // image from website
  
    const classes = useStyles();


    return(
        <>
            
            {/* <Paper className={classes.pf_container}> */}
            <Box className={classes.root}>
            
                <div class="grid-container">
                    <div class='left'>
                    </div>

                    <div class="picture">
                        <Avatar src={img} className = {classes.large} />
                    </div>

                    <div class="right">
                    </div>

                    <div class="profile">
                        <Typography variant="h3"> <b> John Doe </b></Typography>
                        <Typography variant="h5"> <b> Machine Learning Enthusiast </b></Typography>
                        <br/>
                        <Typography> Location: Melbourne, Australia </Typography>
                        <Typography> Ph.: 048592847 </Typography>
                        <Typography> Links: <a href="github.com">github.com</a> </Typography>

                    </div>

                    {/* <div class='left'></div> */}
                    <div class="edit">
                        <IconButton 
                            color="default"
                            className={darkmode ? classes.darkButton : classes.lightButton} 
                            href="../edit/contact"
                        >
                            <EditIcon/>
                        </IconButton>
                    </div>
                    {/* <div class='right'></div> */}
                </div>
                
            </Box>
            <div class='grid-body'>
                <PF_Timeline/>
                <PF_Body/>
            </div>   
        </>
    );
}