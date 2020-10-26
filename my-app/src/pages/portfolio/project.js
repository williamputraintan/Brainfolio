import React from 'react';
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

    const projectData = [
        {
            name: "sb",
            startdate: "August 2019",
            end: "November 2019",
            desc: "cool proejct"

        },
        {
            name: "sb",
            startdate: "August 2019",
            end: "November 2019",
            desc: "cool proejct"

        }
    ]
    var classes = useStyles();
    return(
        <div>
            <hr class="solid"/>
            <Card id="project" className={darkmode ? classes.darkPaper : classes.lightPaper}>
                <Typography variant="h4"> Project</Typography>
                <br/>
                {projectData.map((project) => (
                <Card className={classes.project}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        {project.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {project.startdate} - {project.end}
                        </Typography>
                        <br></br>
                        <Typography variant="body1" component="p">
                            {project.desc}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                ))}

                <Card className={classes.project}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        Shadow Bounce
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        August 2019 - November 2019
                        </Typography>
                        <br></br>
                        <Typography variant="body1" component="p">
                            A game that aims to pop all of the bubbles in the screen using a peg.
                        <br />
                            This project is under SWEN20003.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href="../project">Learn More</Button>
                    </CardActions>
                </Card>
            </Card>

        </div>
    );
}