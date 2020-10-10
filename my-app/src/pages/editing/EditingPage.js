import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import theme from '../../utils/theme'
import Contact from './Contact';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Custom from './Custom';
import Overview from './Overview';

import editbackground from '../../images/editbackground.png';

const buttonStyles = makeStyles(() => ({
    container:{
        
        padding:'5% 0% 5% 5%',
        height:'100%',
        display: 'flex',
        flexWrap: 'wrap',
        width:'90%',
        '& > *': {
            margin: theme.spacing(1),
            width: "90%",
            padding:'3%',
            height:'fit-content'
        },
        

    },
    buttonContainerDesk:{
        height:'12%',
        marginBottom:'5%'
    },
    formContainer:{
        height:'85%',
        padding:'1% 3% 3% 3%'
    },
    button:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'1%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
        },

    },
    buttonOn:{
        backgroundColor:theme.palette.secondary.main,
        color:'#4C516D',
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        "&:hover": {
            backgroundColor: "transparent"
          }

    }
}));

export default function EditingPage(props){
    const classes = buttonStyles();
    const { match, history } = props;
    const { params } = match;
    const { page } = params;
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const tabNameToIndex = {
      0: "contact",
      1: "education",
      2: "experience",
      3: "skills",
      4: "projects",
      5: "custom",
      6: "overview"
    };
  
    const indexToTabName = {
      contact: 0,
      education: 1,
      experience:2,
      skills: 3,
      projects: 4,
      custom: 5,
      overview: 6
    };
  
    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

    function handleChange (newValue) {
        console.log('button clicked')
      history.push(`/edit/${tabNameToIndex[newValue]}`);
      setSelectedTab(newValue);
    };

    function menuClick(num){
        handleChange(num);
        handleCloseMenu();
    }
  

    return (
        <Grid container justify = "center"  alignItems="center" style={{backgroundImage: `url(${editbackground})`,}}>
        <div className={classes.container}> 
            <Paper elevation={5} >
            <div className={classes.buttonContainerDesk}>
                <Hidden smDown>

                    <Button variant="contained" className={(page!=='contact')? classes.button :classes.buttonOn } onClick={()=>( handleChange(0))}>
                        Contact
                    </Button>
                    <Button variant="contained" className={(page!=='education')? classes.button :classes.buttonOn }  onClick={()=>(handleChange(1))}>
                        Education
                    </Button>
                    <Button variant="contained" className={(page!=='experience')? classes.button :classes.buttonOn }onClick={()=>(handleChange(2))}>
                        Experience
                    </Button>
                    <Button variant="contained" className={(page!=='skills')? classes.button :classes.buttonOn } onClick={()=>(handleChange(3))}>
                        Skills
                    </Button>
                    <Button variant="contained" className={(page!=='projects')? classes.button :classes.buttonOn } onClick={()=>(handleChange(4))}>
                        Projects
                    </Button>
                    <Button variant="contained" className={(page!=='custom')? classes.button :classes.buttonOn } onClick={()=>(handleChange(5))}>
                        Custom
                    </Button>
                    <Button variant="contained" className={(page!=='overview')? classes.button :classes.buttonOn } onClick={()=>(handleChange(6))}>
                        Overview
                    </Button>
                </Hidden>
                <Hidden mdUp> 

                    <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
                        <MenuIcon style={{marginRight:'5%'}}/>{tabNameToIndex[selectedTab]}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={()=>menuClick(0)}>Contact</MenuItem>
                        <MenuItem onClick={()=>menuClick(1)}>Education</MenuItem>
                        <MenuItem onClick={()=>menuClick(2)}>Experience</MenuItem>
                        <MenuItem onClick={()=>menuClick(3)}>Skills</MenuItem>
                        <MenuItem onClick={()=>menuClick(4)}>Projects</MenuItem>
                        <MenuItem onClick={()=>menuClick(5)}>Custom</MenuItem>
                        <MenuItem onClick={()=>menuClick(6)}>Overview</MenuItem>

                    </Menu>
                       
                </Hidden>

            </div>
           
            <div className={classes.formContainer}>
                {selectedTab === 0 && <Contact/>}
                {selectedTab === 1 && <Education />}
                {selectedTab === 2 && <Experience />}
                {selectedTab === 3 && <Skills />}
                {selectedTab === 4 && <Projects />}
                {selectedTab === 5 && <Custom />}
                {selectedTab === 6 && <Overview />}

                
            </div>
            </Paper>
        </div></Grid>

    );
}