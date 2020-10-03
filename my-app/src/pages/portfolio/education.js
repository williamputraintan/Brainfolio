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
      },
    indent: {
        padding: theme.spacing(2),
    }
    
  }));

export default function PF_Education(){
    var classes = useStyles();
    return(
        <div>
            <Container className={classes.paper}>
                <Typography variant="h4"> Education</Typography>
                <br/>

                <div class="grid-edu">
                    <Typography variant="h2" class="school">
                        The University of Melbourne
                    </Typography>
                    <Typography variant="h2" class="degree">
                        Master of Information Technology
                    </Typography>
                    <Typography variant="h3" class="year">
                            2008-present
                    </Typography>
                    
                    <Typography variant="h3" class="desc">
                        Course description:
                        <Typography>
                            - bam bam bam
                        </Typography>
                    </Typography>
                </div>

            </Container>

        </div>
    );
}