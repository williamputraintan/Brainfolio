import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    Width: 345,

  },
  media: {
    height: 140,
  },
});

export default function AddCard() {

    const classes = useStyles();



    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />


            <IconButton>
                <Icon className="fa fa-plus-circle" style={{ fontSize: 50 }}>add_circle</Icon>
            </IconButton>
            {/* <Card className={classes.root}>
                <CardActionArea>
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    width="200"
                    height="200"
                    >   

                        <Grid item>
                        <Icon className="fa fa-plus-circle" style={{ fontSize: 30 }}>add_circle</Icon>
                        </Grid>
                        
                
                    </Grid>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">

                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Add Project
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card> */}
        </div>
    )
}
