import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import {useTransition, animated} from 'react-spring';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    height: 8,
    top: 0,
    boxShadow: "0px 8px 12px rgba(0,0,0,0.16)",
    backgroundColor: lighten(theme.palette.primary.main, 0.8)
  },
  bar: {
    height: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    ...theme.palette.reverseGradient,
  },
}));

function DOMTreeLoading() {
  const classes = useStyles();
  const loaderTransition = useTransition(true, null, {
    from: { width: "0%" },
    enter: { width: "60%" },
    leave: { width: "100%" },
  })

  return (
    <div className={classes.root}>
      {
        loaderTransition.map(({_, key, props})=>{
          return(
            <animated.div key={key} className={classes.bar} style={props}></animated.div>
          )
        })
      }
    </div>
  )
}

export default DOMTreeLoading
