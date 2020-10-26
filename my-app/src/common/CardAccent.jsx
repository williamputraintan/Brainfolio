import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2)
  },
}));

function CardAccent(props) {
  const classes = useStyles();
  const theme = useTheme();

  return(
    <Card className={classes.root} 
      style={{ borderBottom: `5px solid ${props.color || theme.palette.primary.main || "#343434"}`}}>
      {props.children}
    </Card>
  )
}

export default CardAccent
