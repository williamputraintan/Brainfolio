import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
    },
    project: {
        margin: theme.spacing(3, 0, 0)
    }
    
  }));

export default function PF_Project(){
    var classes = useStyles();
    return(
        <div>
            <Container className={classes.paper}>
                <Typography variant="h4"> Project</Typography>
                <br/>

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
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>

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
            </Container>

        </div>
    );
}