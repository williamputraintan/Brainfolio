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

    button:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'0.5%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
        },
    },
    button2:{
        backgroundColor:theme.palette.secondary.main,
        color: '#4C516D',
        margin:'0.5%',
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

export default function PF_Skill(preference){
    const darkmode = preference.darkMode;
    const classes = useStyles();
    return(
        <div>
            <hr class="solid"/>
            <Card id="skill" className={darkmode ? classes.darkPaper : classes.lightPaper}>
                <Typography variant="h4"> Skill</Typography>
                <br/>

                <div>
                    <Typography variant="h5">
                        Technical Skill
                    </Typography>
                </div>
                <div>
                    <Button className={classes.button}>React.js</Button>
                    <Button className={classes.button}>Nest.js</Button>
                    <Button className={classes.button}>Redux</Button>
                    <Button className={classes.button}>Kubernetes</Button>
                    <Button className={classes.button}>Docker</Button>
                    <Button className={classes.button}>Python</Button>
                    <Button className={classes.button}>Kubernetes</Button>
                    <Button className={classes.button}>Kubernetes</Button>
                    <Button className={classes.button}>Docker</Button>
                    <Button className={classes.button}>Python</Button>
                    <Button className={classes.button}>Kubernetes</Button>
                </div>
                <br/>
                <br/>
                <div>
                    <Typography variant="h5">
                        Soft Skill
                    </Typography>
                </div>
                <div>
                    <Button className={classes.button2}>Teamwork</Button>
                    <Button className={classes.button2}>Communication</Button>
                    <Button className={classes.button2}>Leadership</Button>
                </div>

            </Card>

        </div>
    );
}