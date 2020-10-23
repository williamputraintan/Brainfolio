import React from 'react';

import PropTypes from 'prop-types';
import { MuiThemeProvider,makeStyles,createMuiTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import step1 from '../../images/aboutUs/instructions/register-t.png';
import step2 from '../../images/aboutUs/instructions/profile-t.png';
import step3 from '../../images/aboutUs/instructions/connect-t.png';
import step4 from '../../images/aboutUs/instructions/post-t.png';
import step5 from '../../images/aboutUs/instructions/explore-t.png';

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
      minWidth:'30px',
      fontFamily: theme.typography.fontFamily,
     
    },
    desc: {
      minWidth:'300px',
      [theme.breakpoints.down('lg')]:{
          img :{
          maxWidth: "40%",
          maxHeight: '40%',
          float:"right"
        } 
      }, 
    },
    writingL:{
      [theme.breakpoints.down('lg')]: {
        width:'50%'
      },
      [theme.breakpoints.down('sm')]: {
        width:"90%",
        fontSize:'15px'
        
      },
      
      textAlign: "left", 
      paddingBottom:"2%",
      padding:"0% 5% 20% 5%",
      fontFamily: theme.typography.fontFamily,
    },
    container:{
      img:{
        float:"right"
      }
    },
    step:{
      [theme.breakpoints.down('lg')]: {
        display:"inline-flex"
      },
      [theme.breakpoints.down('sm')]: {
        display:"revert"

      }

    },
    btn:
      {
        backgroundColor:'#1D3B64' ,
        color: "#fff",
        '&:hover': {
          backgroundColor: '#fff',
          color: '#000'
        },
        float:"left"
      }
  }));

  const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
            minWidth:'10px',
            padding:'10px',
            
          }
      },
      MuiButton: {
        containedPrimary: {
          color: 'white',
        },
      },
      MuiTypography:{
        body1:{
          '@media (max-width: 600px)': {
              maxWidth: "300px",
            },
        }
      }
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
      <div className={classes.root} >
        <MuiThemeProvider theme={theme}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label= "1" {...a11yProps(0)} />
            <Tab label= "2" {...a11yProps(1)} />
            <Tab label= "3" {...a11yProps(2)} />
            <Tab label= "4" {...a11yProps(3)} />
            <Tab label= "5" {...a11yProps(4)} />
          </Tabs>
          <div className={classes.container}> 
            <TabPanel value={value} index={0} >
              <div className={classes.step}> 
                  <div className={classes.writingL}>
                    <h1>
                        Create your account
                    </h1>
                    <h4>
                      Join Brainfolio to link with your colleagues and showcase your portfolio </h4>
                    <Button variant="contained" color={theme.palette.primary.main} className={classes.btn}  href="signUp"> 
                      Get started
                    </Button>
                  </div>    
                  <img src={step1} alt="create your account"/>
                  </div>
            </TabPanel>
            <TabPanel value={value} index={1} >
              <div className={classes.step}> 
                  <div className={classes.writingL}>
                      <h1> Edit your Portfolio Profile</h1>
                      <h4> Add your contact details and your profile picture along with a background image of choice </h4>
                  </div>
                  <img src={step2} alt="edit your profile"/>
                </div>
            </TabPanel>
             <TabPanel value={value} index={2}>
              <div className={classes.step}>               
                  <div className={classes.writingL}>
                    <h1>Add your Education history, Experiences and Projects</h1>
                    <h4>Showcase your education history, experiences and skills by uploading your previous projects with description</h4>
                  </div>
                  <img src={step3} alt="reaction"/>
              </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <div className={classes.step}>               
                <div className={classes.writingL} >
                  <h1>Add a custom section of choice</h1>
                  <h4 >You can showcase more of your other achievements in the custom section </h4>
                </div>
                <img src={step4} alt="posting"/>
              </div>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <div className={classes.step}>               
                  <div className={classes.writingL}>
                    <h1>Review and Share!</h1>
                    <h4>Share your portfolio to the public or your circle of trusted connections</h4>
                  </div>
                  <img src={step5} alt="reaction"/>
              </div>
            </TabPanel>
           </div>
        </MuiThemeProvider>
      </div>
    );
  }
