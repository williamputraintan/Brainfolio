import React from 'react';
import { MuiThemeProvider,makeStyles,createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

import avatar from '../../images/aboutUs/avatar.png';


const cardTheme = createMuiTheme({
    overrides: {
      MuiCardActions: {
        root: {
            justifyContent:"center",
          }
        },   
      },
      
    });
  
  const cardStyles = makeStyles((theme) => ({
   
    root: {
      width: 350,
      minHeight: 450,
      display: "inline-block",
      margin:"2%",
    },
    media: {
      height: '250px',
    },
    name: {
      fontFamily: theme.typography.fontFamily,
      fontSize:'20px',
      fontWeight:"bold",
      alignItems:"center",
      height:"60px"
    },
    memDesc: {
      fontFamily: theme.typography.alternative,
      fontSize:'13px',
      fontWeight:'450',
      padding: '0px 8px 0px',
      justify:"center"
  
    }
  }));
  
export default function MemberCards() {
    const classes = cardStyles();
  
    return (
      
        <div style={{ display: "inline-block"}}>
           <MuiThemeProvider theme={cardTheme}>
          <Card className={classes.root}>
           
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={avatar}
                title="Andrew"
              />
            </CardActionArea>
            <CardActions className={classes.name}>
                <h4>Andrew Tjen</h4>
            </CardActions>
            <CardActions>
            <Typography component="p" className={classes.memDesc}>
              Insert description here
            </Typography>
            </CardActions>
          

          </Card>

          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={avatar}
                title="Franklin"
              />
            </CardActionArea>
            <CardActions className={classes.name}>
                <h4 >Franklin Aldo Darmansa</h4>
            </CardActions>
            <CardActions>
            <Typography component="p" className={classes.memDesc}>
              Insert description here
            </Typography>
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
            <CardActions className={classes.name}>
                <h4 >Hanson Lynn</h4>
            </CardActions>
            <CardActions>
            <Typography component="p" className={classes.memDesc}>
              Insert description here
            </Typography>
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
          <CardActions className={classes.name}>
              <h4  >Patricia Angelica Budiman</h4>
          </CardActions>
          <CardActions>
            <Typography component="p" className={classes.memDesc}>
              Insert description here
            </Typography>
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
          <CardActions className={classes.name}>
              <h4>William Putra Intan</h4>
          </CardActions>
          <CardActions>
            <Typography component="p" className={classes.memDesc}>
              Insert description here
            </Typography>
          </CardActions>
        </Card>
        </MuiThemeProvider>
        </div>
        
    );
  }