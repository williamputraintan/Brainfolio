import React from 'react';
import { MuiThemeProvider,makeStyles,createMuiTheme } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

import avatar from '../images/avatar.png';


const cardTheme = createMuiTheme({
    overrides: {
      MuiCardActions: {
        root: {
            justifyContent:"center",
          }
        },   
      },

    });
  
  const cardStyles = makeStyles({
   
    root: {
      minWidth: 350,
      minHeight: 400,
      display: "inline-block",
      margin:"2%",
      alignContent:"center",
    },
    media: {
      height: 250,
    },
    name: {
      fontFamily: "'Kumbh Sans', sans-serif",
    },
    memDesc: {
      fontFamily: "'Roboto', sans-serif",
    }
  });
  
export default function MemberCards() {
    const classes = cardStyles();
  
    return (
      
        <div style={{ display: "inline-block"}}>
          
          <Card className={classes.root}>
            <MuiThemeProvider theme={cardTheme}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={avatar}
                title="Andrew"
              />
            </CardActionArea>
            <CardActions>
                <h4 className={classes.name}>Andrew Tjen</h4>
            </CardActions>
            <CardActions>
                <h5 className={classes.memDesc}>Member Description</h5>
            </CardActions>
          </MuiThemeProvider>

          </Card>

          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={avatar}
                title="Franklin"
              />
            </CardActionArea>
            <CardActions>
                <h4 class={classes.name}>Franklin Aldo Darmansa</h4>
            </CardActions>
            <CardActions>
                <h5 className={classes.memDesc}>Member Description</h5>
            </CardActions>
          </Card>

          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={avatar}
                title="Hanson"
              />
            </CardActionArea>
            <CardActions>
                <h4 class={classes.name}>Hanson Lynn</h4>
            </CardActions>
            <CardActions>
                <h5 className={classes.memDesc}>Member Description</h5>
            </CardActions>
          </Card>
       
     
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={avatar}
              title="Patricia"
            />
          </CardActionArea>
          <CardActions>
              <h4 class={classes.name} >Patricia Angelica Budiman</h4>
          </CardActions>
          <CardActions>
              <h5 className={classes.memDesc}>Member Description</h5>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={avatar}
              title="William"
            />
          </CardActionArea>
          <CardActions>
              <h4 class={classes.name}>William Putra Intan</h4>
          </CardActions>
          <CardActions>
              <h5 className={classes.memDesc}>Member Description</h5>
          </CardActions>
        </Card>
       
        </div>
        
    );
  }