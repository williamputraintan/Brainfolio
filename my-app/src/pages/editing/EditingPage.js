import React, { useState, useContext} from 'react';
import {UserContext} from '../../context/user.context';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';

import Contact from './Contact';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Custom1 from './Custom1';
import Custom2 from './Custom2';
import Overview from './Overview';
import theme from '../../utils/theme/MinimalTheme'
import { Trail }from './TrailSprings'
import editpageheader from '../../images/editpageheader.png';

const pageStyles = makeStyles(() => ({
    container:{
      minHeight:'100vh',
      height:'auto'
    },
    tabContainer:{
      backgroundImage: `url(${editpageheader})`,
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center center',
      backgroundSize:'cover',
      [theme.breakpoints.up('sm')]: {
        height:'35vh'
      },
      [theme.breakpoints.down('xs')]: {
        height:'20vh'
      }
    },
    upperWords:{
      height:'68%', 
      padding:'2%',
      color:'white',
    },
    text:{
      textAlign:'center',
      paddingTop:'5%'
    },
    title:{
      fontWeight:'900',
      fontFamily:theme.typography.fontFamily,
      [theme.breakpoints.up('sm')]: {
        fontSize:'5vh'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize:'3.5vh'
      }
    },
    subtitle:{
      fontWeight:'500',
      fontFamily:theme.typography.fontFamily,
      [theme.breakpoints.up('sm')]: {
        fontSize:'2vh'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize:'1.5vh'
      }
    },
    paperContainer:{
      minHeight:'100vh',
      width:'100%'
    },
    formContainer:{
      padding:'3%'
    },
    button:{
      backgroundColor:theme.palette.primary.main,
      color:'white',
      margin:'2%',
      fontFamily:theme.typography.fontFamily,
      fontWeight:'600',
      '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: '#4C516D'
      }
    } 
}));

export default function EditingPage(props){
  const {match, history} = props;
  const {params} = match;
  const {page } = params;
  const {state} = useContext(UserContext);
  const username = state.user?.username
  
    const classes = pageStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const tabNameToIndex = {
      0: "contact",
      1: "education",
      2: "experience",
      3: "skills",
      4: "projects",
      5: "custom1",
      6: "custom2",
      7: "overview"
    };

    const indexToTabName = {
      contact:0 ,
      education:1,
      experience:2,
      skills:3,
      projects:4,
      custom1:5,
      custom2:6,
      overview:7
    };

    const title={
      0: "Fill your Contact Details",
      1: "Add your Education History",
      2: "Add your Experiences",
      3: "Add your Skills",
      4: "Showcase your Projects",
      5: "Add your 1st Custom section",
      6: "Add your 2nd Custom section",
      7: "You are almost done!"
    }

    const subtitle={
      0: "Complete your profile to be displayed on your Portfolio",
      1: "List out Education history details",
      2: "List out Experiences history details with descriptions",
      3: "Describe both your Technical and Soft Skils",
      4: "Upload your files or YouTube video link to showcase your Project",
      5: "You may use this section to if you would like to showcase your other achievements",
      6: "You may use this section to if you would like to showcase your other achievements",
      7: "Below are the information to be displayed on your Portfolio"
    }

    const [value, setValue] = React.useState(indexToTabName[page]);
    const [open, set] = useState(true);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    function handleChange (event,newValue) {
        history.push(`/home/edit/${tabNameToIndex[newValue]}/${username}`);      
        setValue(newValue);
    };

    function menuClick(num){
        history.push(`/home/edit/${tabNameToIndex[num]}/${username}`);      
        setValue(num);
        handleCloseMenu();
    }

    const tabsTheme=createMuiTheme({
      ...theme,
      overrides:{
          MuiTab:{
              wrapper:{
                  fontWeight:900
              }
          }
      }
    })
   
    return (
      <ThemeProvider theme={tabsTheme}>
        <Grid container direction="column" alignItems="center" className={classes.container}>
          <Paper elevation={5} className={classes.paperContainer}>
            <div> 
              <div className={classes.tabContainer}>
                <div className={classes.upperWords}>
                    <Trail open={open}>
                      <div className={classes.text}>
                        <Typography className={classes.title} >{title[value]}</Typography>
                        <Typography className={classes.subtitle} >{subtitle[value]} </Typography>
                      </div>
                    </Trail>
                </div>
              </div>
                <div >
                    <Hidden smDown>
                        <Paper style={{height:'100%'}}>
                            <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            >
                            <Tab label="Profile" />
                            <Tab label="Education" />
                            <Tab label="Experience"/>
                            <Tab label="Skills" />
                            <Tab label="Projects"  />
                            <Tab label="Custom 1" />
                            <Tab label="Custom 2" />
                            <Tab label="Overview" />
                            </Tabs>
                        </Paper>
                    </Hidden>
                    
                    <Hidden mdUp>
                        <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
                            <MenuIcon style={{marginRight:'5%'}}/>{tabNameToIndex[value]}
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
                            <MenuItem onClick={()=>menuClick(5)}>Custom 1</MenuItem>
                            <MenuItem onClick={()=>menuClick(6)}>Custom 2</MenuItem>
                            <MenuItem onClick={()=>menuClick(7)}>Overview</MenuItem>
                        </Menu>      
                    </Hidden>
                    </div>
                  </div>
                <Trail open={open}>
                  <div className={classes.formContainer}>
                    {value === 0 && <Contact/>}
                    {value === 1 && <Education/>}
                    {value === 2 && <Experience/>}
                    {value === 3 && <Skills/>}
                    {value === 4 && <Projects/>}
                    {value === 5 && <Custom1/>}
                    {value === 6 && <Custom2/>}
                    {value === 7 && <Overview/>}
                  </div>
                </Trail>
          </Paper> 
        </Grid>
      </ThemeProvider>
    );
}



