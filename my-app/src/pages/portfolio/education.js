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

const education = [
    {
        "_id": "5f8c0781f3b35b44b87ab545",
        "username": "username",
        "startDate": "27-01-2020",
        "endDate": "27-01-2022",
        "degree": "Bachelor in Procastination",
        "institution": "University of Lazyness",
        "location": "Dimana mana",
        "score": "100",
        "__v": 0
    },
    {
        "_id": "5f8c0781f3b35b44b87ab545",
        "username": "username",
        "startDate": "27-01-2020",
        "endDate": "27-01-2022",
        "degree": "Bachelor in Procastination",
        "institution": "University of Lazyness",
        "location": "Dimana mana",
        "score": "100",
        "__v": 0
    },
    {
        "_id": "5f8c0781f3b35b44b87ab545",
        "username": "username",
        "startDate": "27-01-2020",
        "endDate": "27-01-2022",
        "degree": "Bachelor in Procastination",
        "institution": "University of Lazyness",
        "location": "Dimana mana",
        "score": "100",
        "__v": 0
    },
    {
        "_id": "5f8c0781f3b35b44b87ab545",
        "username": "username",
        "startDate": "27-01-2020",
        "endDate": "27-01-2022",
        "degree": "Bachelor in Procastination",
        "institution": "University of Lazyness",
        "location": "Dimana mana",
        "score": "100",
        "__v": 0
    },
]
export default function PF_Education(preference){
    const darkmode = preference.darkMode;
    var classes = useStyles();
    return(
        <div>
            <hr class="solid"/>
            <Card id="education" className={darkmode ? classes.darkPaper : classes.lightPaper}>
                <Typography variant="h4"> Education</Typography>
                <br/>
                {education.map((data) => (
                    <div class="grid-edu">
                    <Typography variant="h2" class="school">
                        {data.institution}
                    </Typography>
                    <Typography variant="h2" class="degree">
                        {data.degree}
                        <Typography>
                        {data.location}
                        </Typography>
                    </Typography>
                    <Typography variant="h3" class="year">
                            {data.startDate}  -  {data.endDate}
                    </Typography>
                    
                    
                    <Typography variant="h3" class="desc">
                        Score: {data.score}
                    </Typography>
                </div>
                ))}
                
                

            </Card>

        </div>
    );
}