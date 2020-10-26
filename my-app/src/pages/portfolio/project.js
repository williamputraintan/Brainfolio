import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
import AxiosInstance  from "../../utils/axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';


import './new-pf.css'

const useStyles = makeStyles((theme) => ({
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
    },
    project: {
        margin: theme.spacing(3, 0, 0)
    }
    
  }));

export default function PF_Project(preference){

    const darkmode = preference.darkMode;
    const classes = useStyles();
    const [project,setProject] = useState([]);
    let flag = true;
    let loc = window.location.pathname;

    function getUsername(path) {
        const res = path.split("/");
        return res[2];
    }

    if (flag){
        AxiosInstance.get("public/allproject/"+getUsername(loc))
        .then(res => {
        setProject(res.data);
        })
        flag = false;
    }

    function projectLink(username, id){
        return "../project/"+username+"/"+id;
    }
    return(
        <div>
            <hr class="solid"/>
            <Card id="project" className={darkmode ? classes.darkPaper : classes.lightPaper}>
                <Typography variant="h4"> Project</Typography>
                <br/>
                {project.map((project) => (
                <Card className={classes.project}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        {project.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {project.startDate} - {project.endDate}
                        </Typography>
                        <br></br>
                        <Typography variant="body1" component="p">
                            {project.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={projectLink(project.username, project._id)}>Learn More</Button>
                    </CardActions>
                </Card>
                ))}


            </Card>

        </div>
    );
}