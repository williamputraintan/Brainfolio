import React from 'react'
import { makeStyles }from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    height: "100vh"
  }
}));

function Steps() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      
    </section>
  )
}

export default Steps
