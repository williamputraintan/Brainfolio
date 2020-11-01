import React, { useState, useContext, Suspense}  from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import SkeletonCard from "../../../common/SkeletonCard";
import { Route, Switch, withRouter, Redirect } from "react-router";

import Paths from "../../../utils/path";



const Contact = React.lazy(() => import('../../../pages/editing/Contact'));
const Education = React.lazy(() => import('../../../pages/editing/Education'));
const Skills = React.lazy(() => import('../../../pages/editing/Skills'));
const Experience = React.lazy(() => import('../../../pages/editing/Experience'));
const Projects = React.lazy(() => import('../../../pages/editing/Projects'));
const Custom1 = React.lazy(() => import('../../../pages/editing/Custom1'));
const Custom2 = React.lazy(() => import('../../../pages/editing/Custom2'));
const Overview = React.lazy(() => import('../../../pages/editing/Overview'));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  dialog:{
    '& > div:nth-of-type(3) > div':{
      maxHeight: "100%",
      margin: 0,
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      flexGrow: 1,
      '& > div':{
        justifyContent: "flex-start"
      }
    },
  },
}));


function SlideLayout() {
  const history = useHistory();
  const classes = useStyles();


  return (
    <Dialog
        className={classes.dialog}
        fullWidth={true}
        maxWidth="lg"
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions>
          <IconButton aria-label="Close" onClick={() => history.goBack()}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </DialogActions>
        
        <DialogContent>

          <Suspense fallback={<SkeletonCard/>}>
            <Switch>
              <Route exact path={Paths.EDIT_CONTACT} component={Contact}/>
              <Route exact path={Paths.EDIT_EDUCATION} component={Education}/>
              <Route exact path={Paths.EDIT_EXPERIENCE} component={Experience}/>
              <Route exact path={Paths.EDIT_SKILLS} component={Skills}/>
              <Route exact path={Paths.EDIT_PROJECTS} component={Projects}/>
              <Route exact path={Paths.EDIT_CUSTOM1} component={Custom1}/>
              <Route exact path={Paths.EDIT_CUSTOM2} component={Custom2}/>
              <Route exact path={Paths.EDIT_OVERVIEW} component={Overview}/>
            </Switch>
          </Suspense>
        </DialogContent>
      </Dialog>
  )
}

export default SlideLayout
