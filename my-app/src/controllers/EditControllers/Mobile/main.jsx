import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { withRouter, Route  } from "react-router-dom";

import EditLayout from "../Mobile/EditLayout";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: "center",
    fontWeight: 700
  },
  subtitle: {
    color: theme.palette.text.secondary,
    textAlign:"center",
    display: "block",
    marginBottom: theme.spacing(2)
  },
  editItem: {
    maxWidth : 120,
    margin:'auto',
    marginBottom: theme.spacing(2),
    '& > div':{
      padding: theme.spacing(2),
    }
  },
  editItemTitle: {
    fontWeight: 700,
    textAlign: "center",
    textTransform: "Capitalize",
    fontSize:"1rem",
    padding: theme.spacing(1)
  },
  media: {
    height: 80,
  }

}));

const editItems = ["Description", "Experience", "Educations", "Skills","Projects"]

function EditMobile(props) {
  const classes = useStyles();
  const { history, location } = props;
  const { pathname } = location;

  return (
    <>
      <div>
        <Typography className={classes.title} color="primary" variant="h4" gutterBottom>
          Edit Your Profile
        </Typography>
        <Typography className={classes.subtitle} variant="caption" gutterBottom>
          Let other people know you more! Add projects, portfolio and details to get others to know you more
        </Typography>
        
      
        <Paper className={classes.root} elevation={1}>
          <Grid container justify="center">
            {
              editItems.map((item,key) => {
                return(
                  <Grid item xs={6} key={key}>
                    <Card variant="outlined" className={classes.editItem}>
                      <CardActionArea onClick={() => history.push(`${location.pathname}/${item}`)}>
                        <CardMedia
                          className={classes.media}
                          image={`https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&h=300&w=300`}
                          title="Contemplative Reptile"
                        />
                        <Typography className={classes.editItemTitle} gutterBottom>
                          {item}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
        </Paper>
        <Route exact path="/home/edit/:username/:page" component={EditLayout}/>
      </div>
   
      
    </>
  )
}

export default withRouter(EditMobile);
