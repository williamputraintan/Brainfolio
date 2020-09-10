import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider,makeStyles,createMuiTheme } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
      margin:"2%"
    },
    media: {
      height: 250,
    },
  });
  
export default function MemberCards() {
    const classes = cardStyles();
  
    return (
      
        <div className="teammember" style={{ display: "inline-block"}}>
          
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
                <h4 class="name">Andrew Tjen</h4>
            </CardActions>
            <CardActions>
                <h5 style={{fontFamily:"Roboto, sans-serif"}}>Member Description</h5>
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
                <h4 class="name">Franklin Aldo Darmansa</h4>
            </CardActions>
            <CardActions>
                <h5 style={{fontFamily:"Roboto, sans-serif"}}>Member Description</h5>
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
                <h4 class="name">Hanson Lynn</h4>
            </CardActions>
            <CardActions>
                <h5 style={{fontFamily:"Roboto, sans-serif"}}>Member Description</h5>
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
              <h4 class="name" >Patricia Angelica Budiman</h4>
          </CardActions>
          <CardActions>
              <h5 style={{fontFamily:"Roboto, sans-serif"}}>Member Description</h5>
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
              <h4 class="name">William Putra Intan</h4>
          </CardActions>
          <CardActions>
              <h5 style={{fontFamily:"Roboto, sans-serif"}}>Member Description</h5>
          </CardActions>
        </Card>
       
        </div>
        
    );
  }