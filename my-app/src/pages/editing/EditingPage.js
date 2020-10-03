import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';

import theme from '../../utils/theme'
import Contact from './Contact';
import Description from './Description';
import Education from './Education'
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Custom from './Custom';

const buttonStyles = makeStyles(() => ({
    container:{
        padding:'5%',
        height:'100%'
    },
    buttonContainerDesk:{
        height:'15%'
    },
    formContainer:{
        height:'85%',
        padding:'1% 3% 3% 3%'
    },
    mobile:{
     
    },
    button:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'1%',
        fontFamily:theme.typography.fontFamily,
        paddingRight:'2%',
        paddingLeft:'2%',
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
      1: "description",
      2: "education",
      3: "experience",
      4: "skills",
      5: "projects",
      6: "custom"
    };
  
    const indexToTabName = {
      contact: 0,
      description: 1,
      education: 2,
      experience: 3,
      skills: 4,
      projects: 5,
      custom: 6
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
        <div className={classes.container}> 
            <div className={classes.buttonContainerDesk}>
                <Hidden only={['xs','sm']}>

                    <Button variant="contained" className={(page!=='contact')? classes.button :classes.buttonOn } onClick={()=>( handleChange(0))}>
                        Contact
                    </Button>
                    <Button variant="contained" className={(page!=='description')? classes.button :classes.buttonOn } onClick={()=>(handleChange(1))}>
                        Description
                    </Button>
                    <Button variant="contained" className={(page!=='education')? classes.button :classes.buttonOn }  onClick={()=>(handleChange(2))}>
                        Education
                    </Button>
                    <Button variant="contained" className={(page!=='experience')? classes.button :classes.buttonOn }onClick={()=>(handleChange(3))}>
                        Experience
                    </Button>
                    <Button variant="contained" className={(page!=='skills')? classes.button :classes.buttonOn } onClick={()=>(handleChange(4))}>
                        Skills
                    </Button>
                    <Button variant="contained" className={(page!=='projects')? classes.button :classes.buttonOn } onClick={()=>(handleChange(5))}>
                        Projects
                    </Button>
                    <Button variant="contained" className={(page!=='custom')? classes.button :classes.buttonOn } onClick={()=>(handleChange(6))}>
                        Custom
                    </Button>
                </Hidden>
                <Hidden only={['md', 'lg']}> 

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
                        <MenuItem onClick={()=>menuClick(1)}>Description</MenuItem>
                        <MenuItem onClick={()=>menuClick(2)}>Education</MenuItem>
                        <MenuItem onClick={()=>menuClick(3)}>Experience</MenuItem>
                        <MenuItem onClick={()=>menuClick(4)}>Skills</MenuItem>
                        <MenuItem onClick={()=>menuClick(5)}>Projects</MenuItem>
                        <MenuItem onClick={()=>menuClick(6)}>Custom</MenuItem>
                        </Menu>
                       
                </Hidden>

            </div>
           
            <div className={classes.formContainer}>
                {selectedTab === 0 && <Contact/>}
                {selectedTab === 1 && <Description />}
                {selectedTab === 2 && <Education />}
                {selectedTab === 3 && <Experience />}
                {selectedTab === 4 && <Skills />}
                {selectedTab === 5 && <Projects />}
                {selectedTab === 6 && <Custom />}
                
            </div>
        </div>

    );
}