import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import theme from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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
                    <div class='left'>
                        
                    </div>
                    <div class="picture">
                        <Avatar src={require('../../images/portfolio-profilepic/arthursetiawan.jpg')} className = {classes.large} />
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
                            className={classes.button} 
                            href="../edit/contact"
                        >
                            <EditIcon/>
                        </IconButton>
                    </div>
                    {/* <div class='right'></div> */}
                </div>
                
            </Container>
            {/* <hr class="solid"/> */}

            <div class='grid-body'>
                <PF_Timeline/>
                <PF_Body/>
            </div>   
        </div>
    );
}