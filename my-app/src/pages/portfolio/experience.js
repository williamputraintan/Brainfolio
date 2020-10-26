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
import IconButton from '@material-ui/core/IconButton';


import './new-pf.css'

const useStyles = makeStyles((theme) => ({
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
    indent: {
        padding: theme.spacing(2),
    }
    
  }));

export default function PF_Experience(preference){
    const darkmode = preference.darkMode;
    const classes = useStyles();

    const exp = [
                    {
                        "_id":{"$oid":"5f92f8178c708fbb53a27ec7"},
                        "username":"pbudiman",
                        "type":"Volunteer",
                        "name":"Vinnies",
                        "title":"Retail Volunteer",
                        "description":"Helps in managing the retail store",
                        "startDate":{"$date":{"$numberLong":"1484175600000"}},
                        "endDate":{"$date":{"$numberLong":"1547593200000"}},
                        "onGoing":false,
                        "__v":{"$numberInt":"0"}
                    }
                ]

    return(
        <div>
            <hr class="solid"/>
            {/* <Container className={classes.paper}> */}
            <Card id="experience" className={darkmode ? classes.darkPaper : classes.lightPaper}>
                <Typography variant="h4"> Experience</Typography>
                <br/>

                {exp.map((data) => (
                <div class="grid-exp">
                    
                    <Typography variant="h2" class="role">
                        {data.title}
                    </Typography>
                    <Typography variant="h3" class="year">
                        {/* {formatDate(data.startDate)} - {formatDate(data.endDate)} */}
                    </Typography>
                    <Typography variant="h2" class="company">
                        Apple Inc.
                    </Typography>
                    <Typography variant="h3" class="desc">
                        Job Description:
                        <Typography>
                            - bam bam bam
                        </Typography>
                    </Typography>
                </div>
                ))}
            </Card>
            {/* </Container> */}

        </div>
    );
}