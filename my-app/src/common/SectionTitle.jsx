
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  title: {
    color: theme.palette.text.primary,
    fontFamily: "heebo, 'sans-serif'"
  },
  subtitle: {
    color: theme.palette.text.secondary,
  }
}));

//Promote consistent use of page title
function TypographyTitle(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.root} component="div" gutterBottom>
      <Box fontSize="h3.fontSize" className={classes.title} fontWeight="fontWeightBold">
        {props.title}
      </Box>
      {
        props?.subtitle && 
        <Box fontSize="fontSize" className={classes.subtitle}>
          {props.subtitle}
        </Box>
      }
  </Typography>
  )
}

export default TypographyTitle;
