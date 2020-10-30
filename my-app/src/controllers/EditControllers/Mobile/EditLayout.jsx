import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from "framer-motion";

import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Education from "../../../pages/editing/Education";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    padding: theme.spacing(2),
    position: "absolute",
    background: theme.palette.background.paper,
    width: "100%",
    left: 0,
    zIndex: 999,
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
  },
  closeButton: {
    padding: 0
  },
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
    overflow: "auto"
  }
}));

function EditLayout(props) {
  const classes = useStyles();
  const history = useHistory();

  


  return (
    <AnimatePresence>
      <>
        {
          <motion.div
            className={classes.root}
            initial={{ transform: "translateY(0)" }}
            animate={{ transform: "translateY(-90vh)" }}
            transition={{ type: "spring",damping: 19}}
            >
            <IconButton className={classes.closeButton} aria-label="Close" onClick={() => history.goBack()}>
              <CloseIcon />
            </IconButton>

            <div className={classes.content}>
              <Education />
            </div>
          </motion.div>
        }
      </>
    </AnimatePresence> 
  )
}

export default EditLayout
