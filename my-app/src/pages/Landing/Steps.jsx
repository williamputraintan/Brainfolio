import React from 'react'
import { makeStyles, useTheme }from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import StepsSlide from "../../components/Landing/StepsSlide";

//SVG
import Review from "./SVG/Review";
import Create from "./SVG/Create";
import Edit from "./SVG/Edit";


const tutorialSteps = [
  {
    key: 1,
    title: 'Create',
    description: "Store information that you want to display with us. Rest assured, we do not store sensitive details like password",
    svg: <Create />
  },
  {
    key: 2,
    title: 'Edit',
    description: "Let future propects know about you and what you are capable of",
    svg: <Edit />
  },
  {
    key: 3,
    title: 'Review',
    description: "Share your profile with friends and employers to increase your network and opportunities",
    svg: <Review />
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F4F8FE21",
    padding: theme.spacing(4),
    [theme.breakpoints.up("sm")]:{
      padding: `${theme.spacing(8)}px calc(5% + ${theme.spacing(6)}px) ` 
    },
    display:"flex",
    justifyContent: "center",
    flexDirection: "column",
    height:"100vh",
  },
  stepper: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]:{
      maxWidth: 300,
      backgroundColor: "inherit"
    },
  }
}));




function Steps() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <section className={classes.root}>

       <StepsSlide data={tutorialSteps[activeStep]}/>

       <MobileStepper
        className={classes.stepper}
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />

      
    </section>
  )
}

export default Steps
