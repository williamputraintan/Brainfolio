import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import step1 from '../images/instruction/register-t.png';
import step2 from '../images/instruction/profile-t.png';
import step3 from '../images/instruction/connect-t.png';
import step4 from '../images/instruction/post-t.png';
import step5 from '../images/instruction/explore-t.png';

import './aboutUs.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
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
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#DFDFDF",
      display: 'flex',
      height: '80%',
    },
    
  }));
  
  function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Step 1" {...a11yProps(0)} />
          <Tab label="Step 2" {...a11yProps(1)} />
          <Tab label="Step 3" {...a11yProps(2)} />
          <Tab label="Step 4" {...a11yProps(3)} />
          <Tab label="Step 5" {...a11yProps(4)} />


        </Tabs>
        <div>
        <TabPanel value={value} index={0} >
          Create your account
          <img src={step1} style={{float: "right"}}></img>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Edit your profile
          <img src={step2} style={{float: "left"}}></img>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Connect with your friends
          <img src={step3} style={{float: "center"}}></img>
        </TabPanel>
        <TabPanel value={value} index={3}>
          Create your own post!
          <img src={step4} style={{float: "left"}}></img>

        </TabPanel>
        <TabPanel value={value} index={4}>
          Comment and like on other's posts
          <img src={step5} style={{float: "right"}}></img>

        </TabPanel>
        </div>
        
      </div>
    );
  }

export default function AboutUs(){
    const enableSearch=true;
    return(
       
        <div className='about-container'>
            <div className='whatwedo'>
                <h1>What we do.</h1>
                <h2>Explain what the web app does here.</h2>
            </div>
            <div className='instructions'>
                <h2>How to Use.</h2>
                <VerticalTabs/>
            </div>
            <div className='meettheteam'>
                <h2>Meet the team.</h2>
            </div>
            
        </div>
         
    );
}




