import React from 'react';

//Stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getLastPath(pathname){
  return pathname.split("/").slice(-1)[0]
}


const steps = ['Creating an account', 'Additional information', 'Success!']

function StepperController(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const { pathname } = useLocation();



  React.useEffect(() => {
    if(getLastPath(pathname))

    switch(getLastPath(pathname)){
      case "1":
        setActiveStep(0)
        break;
      case "2":
        setActiveStep(1)
        break;
      case "3":
        setActiveStep(2)
        break;
      default:
        setActiveStep(0)
        break;
    }

  }, [pathname])


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> 
    </div>
  )
}

export default StepperController