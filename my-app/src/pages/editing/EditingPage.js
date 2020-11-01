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
import { useTrail, animated } from 'react-spring'

const pageStyles = makeStyles((theme) => ({
    container:{
      minHeight:'100vh',
      height:'auto'
    },
    tabContainer:{
      // backgroundColor:"#E2ECF8",
      backgroundColor:theme.palette.primary.main,
      width:'100vw', 
      [theme.breakpoints.up('sm')]: {
        height:'18vh'
      },
      [theme.breakpoints.down('xs')]: {
        height:'20vh'
      }
    },
    upperWords:{
      height:'68%', 
      padding:'2%'
    },
    title:{
      fontWeight:'600',
      color:theme.palette.fontDefault,
      fontFamily:theme.typography.alternative,
    },
    subtitle:{
      color:theme.palette.fontDefault,
      fontFamily:theme.typography.alternative,
    },
    paperContainer:{
      minHeight:'100vh'
    },
    formContainer:{
      padding:'3%'
    },
    button:{
      backgroundColor:theme.palette.secondary.main,
      color:theme.palette.fontDefault,
      margin:'2%',
      fontFamily:theme.typography.fontFamily,
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
      7: "Your Overview"
    }

    const subtitle={
      0: "Complete your profile to be displayed on your Portfolio",
      1: "List out Education history details",
      2: "List out Experiences history details with descriptions",
      3: "Describe both your Technical and Soft Skilss",
      4: "Upload your files/ video link to showcase yout Project",
      5: "Add entries for your other achievements",
      6: "Add entries for your other achievements",
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
                      <div>
                        <Typography variant="h5" className={classes.title} >{title[value]}</Typography>
                        <Typography variant="h7" className={classes.subtitle} >{subtitle[value]} </Typography>
                      </div>
                    </Trail>
                    

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
            </div>
          </Paper> 
        </Grid>
      </ThemeProvider>
    );
}

//react spring
function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 10, tension: 2000, friction: 400 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}



