import React from 'react';
import {Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  root: {
    // padding: theme.spacing(2,4,2,4)
  },
}));

const accentColor =  "#f44336";
function DescriptionController(props) {
  const description = props.data;
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root}>
          <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
          <b>{description}</b>
        </Typography>
          </Grid>
      </Grid>
        <br/>
    </div>
  )
}

export default DescriptionController