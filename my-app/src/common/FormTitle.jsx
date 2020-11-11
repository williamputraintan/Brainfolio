import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  title: {
    color: theme.palette.text.secondary,
    textTransform: "Uppercase",
  }
}));


function FormTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="div" gutterBottom>
        <Box fontSize="h5.fontSize" className={classes.title} fontWeight={600}>
          {props.title}
        </Box>
      </Typography>
    </div>
  )
}

export default FormTitle
