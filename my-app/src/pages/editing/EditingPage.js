import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import theme from '../../utils/theme'
import Contacts from './Contacts';


const buttonStyles = makeStyles(() => ({
    container:{
        padding:'5%',
        height:'100%'
    },
    buttonContainer:{
        height:'15%'
    },
    formContainer:{
        height:'85%',
        padding:'3%'
    },
    button:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
          },
    }
}));

export default function EditingPage(){
    const classes = buttonStyles();
    const [page,setPage]= useState("");
    var currentState = 'contacts'

    function contactsDetail(){
        if(page=='contacts') {return <Contacts/>}
      
    }

  
    return (
        <div className={classes.container}> 
            <div className={classes.buttonContainer}>
                <Button variant="contained" className={classes.button} onClick={()=>( setPage('contacts'))}>
                    Contact
                </Button>
                <Button variant="contained" className={classes.button} onClick={()=>(setPage('description'))}>
                    Description
                </Button>
                <Button variant="contained" className={classes.button} onClick={()=>(setPage('education'))}>
                    Education
                </Button>
                <Button variant="contained" className={classes.button} onClick={()=>(setPage('experience'))}>
                    Experience
                </Button>
                <Button variant="contained" className={classes.button} onClick={()=>(setPage('skills'))}>
                    Skills
                </Button>
            </div>
            <div className={classes.formContainer}>
                {contactsDetail()}
                    
            </div>
        </div>

    );
}