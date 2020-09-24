import React from 'react';

import PropTypes from 'prop-types';
import { MuiThemeProvider,makeStyles,createMuiTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


import step1 from '../images/instruction/register-t.png';
import step2 from '../images/instruction/profile-t.png';
import step3 from '../images/instruction/connect-t.png';
import step4 from '../images/instruction/post-t.png';
import step5 from '../images/instruction/explore-t.png';
import { white } from 'chalk';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={0}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      
    };
  }
  
  const tabsStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "white",
      display: 'flex',
      minWidth:'10px',
      
    },
    desc: {
      fontFamily: "'Lato', sans-serif",
      padding: '0 10% 0 10%',
    },
    container:{
      '@media (max-width: 600px)': {
        maxWidth: "310px"}

    },
    btn:
      {
        position:'center', 
      fontFamily:"'Lato', sans-serif",
      
    }
    
  }));

  const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
            '@media (min-width: 600px)': {
                minWidth: "50px"},
          minWidth:'50px',
          padding:'10px',
          
          }
      },
      MuiButton: {
        containedPrimary: {
          backgroundColor: '#1D3B64',
          color: 'white',
        },
      },
    
        
      
      },
    
      palette: {
        primary: {
          main: '#1D3B64',
          
        },
        
        
        
    },

    });
  
export default function VerticalTabs() {
    const classes = tabsStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="Vertical tabs example"
        >
          <Tab label= "1" {...a11yProps(0)} />
          <Tab label= "2" {...a11yProps(1)} />
          <Tab label= "3" {...a11yProps(2)} />
          <Tab label= "4" {...a11yProps(3)} />
          <Tab label= "5" {...a11yProps(4)} />
        </Tabs>
        <div className={classes.container}>
        <TabPanel value={value} index={0} >
          <div className={classes.desc}>
                <h1 style={{textAlign: "left", paddingBottom:"2%"}}>
                    Create your account
                </h1>
                <h5 style={{textAlign: "left", paddingBottom:"2%"}}>
                  Join Brainfolio to link with your colleagues and <br/>
                  showcase your portfolio </h5>
            <Button variant="contained" color="primary" className={classes.btn}  href="signUp"> 
              
              Get started
              
               
            </Button>
            
            
            <img src={step1} style={{float: "right"}} alt="create your account "></img>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div className={classes.desc}>
                <h1 style={{textAlign: "right"}}>
                    Edit your portfolio and showcase your skills
                </h1>
                <h5 style={{textAlign: "right"}}>
                  Upload your profile picture 
                  and your previous projects 
                  </h5>
                <img src={step2} style={{float: "left"}} alt="edit your profile"></img>
            </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <div className={classes.desc}>
                <h1 style={{textAlign: "left"}}>
                    Connect with your friends
                </h1>
                <h5 style={{textAlign: "left"}}>
                  Find your friends and connect to see <br/>
                  what they have been up to
                  </h5>
                <img src={step3} style={{float: "right"}} alt="connect with friends "></img>
            </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <div className={classes.desc}>
                <h1 style={{textAlign: "right"}}>
                    Create your own post
                </h1>
                <h5 style={{textAlign: "right"}}>
                  Post your projects and <br/>
                  experiencs to let your colleagues know
                </h5>
                <img src={step4} style={{float: "left"}} alt="create your own post"></img>
            </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <div className={classes.desc}>
                <h1 style={{textAlign: "left"}}>
                    Comment and like on other's posts
                </h1>
                <h5 style={{textAlign: "left"}}>
                  Leave comments and reactions on <br/>
                  your connections' posts to encourage them
                </h5>
                <img src={step5} style={{float: "right"}} alt="react to other's post "></img>
            </div>
        </TabPanel>
        </div>

        
        </MuiThemeProvider>
        </div>
    );
  }