import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmptyIllustration from "../Assets/SVG/EmptyIllustration";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  svg:{
    width: 300,
    marginBottom: theme.spacing(2)
  },
  text:{
    fontWeight: 700,
    fontSize: "0.875rem",
    textAlign: 'center',
    color: theme.palette.text.secondary
  }

}));


function CardEmpty({text}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <EmptyIllustration className={classes.svg}/>
    
        <Typography className={classes.text} gutterBottom>
          <Box  fontSize="default" fontWeight="fontWeightBold" textAlign="center">
            {text}
          </Box>
        </Typography>
    </div>
  )
}

export default CardEmpty
