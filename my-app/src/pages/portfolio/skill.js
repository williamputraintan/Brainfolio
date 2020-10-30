import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/store.context';
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
import Chip from '@material-ui/core/Chip'
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
    const [skill,setSkill] = useState([]);
    let flag = true;
    let loc = window.location.pathname;

    function getUsername(path) {
        const res = path.split("/");
        return res[2];
    }

    if (flag){
        AxiosInstance.get("public/skills/"+getUsername(loc))
        .then(res => {
        setSkill(res.data);
        })

        flag = false;
    }

    function softSkill(data){
        if (data.category==="Soft"){
            return(
                <Chip className={classes.button} label={data.name}/>
                )
            }
    }

    function techSkill(data){
        if (data.category==="Technical"){
            return(
            <Chip className={classes.button} label={data.name}/>
            )
        }
    }

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
                    {skill.map((data)=> (
                        techSkill(data)
                        ))}
                    
                </div>
                <br/>
                <br/>
                <div>
                    <Typography variant="h5">
                        Soft Skill
                    </Typography>
                </div>
                <div>
                {skill.map((data)=> (
                        softSkill(data)
                ))}
                </div>

            </Card>

        </div>
    );
}