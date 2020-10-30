import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from "framer-motion"


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    height: 5,
    top: 0,
    boxShadow: "0px 8px 12px rgba(0,0,0,0.16)",
    backgroundColor: lighten(theme.palette.primary.main, 0.8)
  },
  bar: {
    height: 5,
    backgroundColor: theme.palette.primary.main
  },
}));

function DOMTreeLoading() {
  const classes = useStyles();

  return (
    <AnimatePresence exitBeforeEnter>
      <div className={classes.root}>
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          exit={{ width: "100%" }}
          className={classes.bar}
            />
      </div>
    </AnimatePresence>
  )
}

export default DOMTreeLoading
