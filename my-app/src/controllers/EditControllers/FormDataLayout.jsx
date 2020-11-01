import React , {Suspense} from 'react';
import Paper from '@material-ui/core/Paper';
import { Route, Switch, useLocation} from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paths from "../../utils/path";
import SkeletonCard from "../../common/SkeletonCard";

import FormTitle from "../../common/FormTitle";



// Lazy load component
// Forms
const Contact = React.lazy(() => import('../../pages/editing/Contact'));
const Education = React.lazy(() => import('../../pages/editing/Education'));
const Skills = React.lazy(() => import('../../pages/editing/Skills'));
const Experience = React.lazy(() => import('../../pages/editing/Experience'));
const Projects = React.lazy(() => import('../../pages/editing/Projects'));
const Custom1 = React.lazy(() => import('../../pages/editing/Custom1'));
const Custom2 = React.lazy(() => import('../../pages/editing/Custom2'));
const Overview = React.lazy(() => import('../../pages/editing/Overview'));
const ContactForm = React.lazy(() => import("./EditForms/ContactForm"));

//Data display
const ContactList =  React.lazy(() => import("./DataDisplay/ContactList"));


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  container:{
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(4),
    padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`
  },
  dataDisplay:{
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    marginTop: theme.spacing(2)
  }
}));

function FormDataLayout(props) {

  const classes = useStyles();
  const { pathname } = useLocation();


  return (
   
      <Suspense fallback={<SkeletonCard/>}>

        <Grid container className={classes.root}>
          
          <Grid container xs={8} spacing={4}>
            <Paper elevation={2} className={classes.content}>
              <FormTitle title={`Edit ${pathname.split("/").slice(-1)}`}/>
              <Switch>
                <Route exact path={Paths.EDIT_CONTACT} component={ContactForm}/>
                <Route exact path={Paths.EDIT_EDUCATION} component={Education}/>
                <Route exact path={Paths.EDIT_EXPERIENCE} component={Experience}/>
                <Route exact path={Paths.EDIT_SKILLS} component={Skills}/>
                <Route exact path={Paths.EDIT_PROJECTS} component={Projects}/>
                <Route exact path={Paths.EDIT_CUSTOM1} component={Custom1}/>
                <Route exact path={Paths.EDIT_CUSTOM2} component={Custom2}/>
                <Route exact path={Paths.EDIT_OVERVIEW} component={Overview}/>
              </Switch>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={2} className={classes.dataDisplay}>
              <Switch>
                <Route exact path={Paths.EDIT_CONTACT} component={ContactList}/>
                <Route exact path={Paths.EDIT_EDUCATION} component={ContactList}/>
                <Route exact path={Paths.EDIT_EXPERIENCE} component={ContactList}/>
                <Route exact path={Paths.EDIT_SKILLS} component={ContactList}/>
                <Route exact path={Paths.EDIT_PROJECTS} component={ContactList}/>
                <Route exact path={Paths.EDIT_CUSTOM1} component={ContactList}/>
                <Route exact path={Paths.EDIT_CUSTOM2} component={ContactList}/>
                <Route exact path={Paths.EDIT_OVERVIEW} component={ContactList}/>
              </Switch>
              
            </Paper>
          </Grid>
      </Grid>
     
    </Suspense>
   

  )
}

export default FormDataLayout
