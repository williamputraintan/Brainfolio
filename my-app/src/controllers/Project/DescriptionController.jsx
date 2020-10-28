import React, {useState} from 'react';
import {Grid ,Avatar, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import AxiosInstance from "../../utils/axios";

const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2,4,2,4)
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
            <Typography className={classes.title} variant="h4" gutterBottom>
              Description
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="body1">
            {description}
        </Typography>
          </Grid>
      </Grid>
        <br/>
    </div>
  )
}

export default DescriptionController
