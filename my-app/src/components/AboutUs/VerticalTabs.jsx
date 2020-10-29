import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles ,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import theme from '../../utils/theme/MinimalTheme';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { useTrail, a } from 'react-spring'

import step1 from '../../images/aboutUs/instructions/register-t.png';
import step2 from '../../images/aboutUs/instructions/profile-t.png';
import step3 from '../../images/aboutUs/instructions/connect-t.png';
import step4 from '../../images/aboutUs/instructions/post-t.png';
import step5 from '../../images/aboutUs/instructions/explore-t.png';

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
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabBody:{
    display:'inline'
    
  },
  description:{
    [theme.breakpoints.up('sm')]:{
      width:'40%',
      height:'100%', 
      float:'left',
    },
    [theme.breakpoints.down('xs')]:{
      width:'100%',
      height:'100%', 
    },
    padding:'0 0 0 4%'
  },
  imgdesc:{
    [theme.breakpoints.up('sm')]:{
      width:'55%',
      height:'100%', 
      float:'right'
    },
    [theme.breakpoints.down('xs')]:{
      marginTop:'10%',
      width:'100%',
      height:'100%', 
    },
    padding:'0 4% 0 4%'
  }
}));

  const vTabs = createMuiTheme({
    ...theme,
    overrides: {
      MuiTab: {
        wrapper: {
          [theme.breakpoints.up('xl')]:{
            fontSize:'2rem'
          },
        }
      },
      MuiTypography:{
        h1:{
          paddingBottom:'5%',
          fontSize:'4.5vh'
        },
        h3:{
          paddingBottom:'5%',
          fontSize:'2.5vh'
        }
      },
      MuiButton:{
        contained:{
          backgroundColor:theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
          padding:'2%',
          fontSize:'2vh'
        },
        label:{
          color:'white',
          "&:hover": {
            color: "black"
          }
        },
        
      },
      PrivateTabIndicator:{
        colorSecondary:{
          backgroundColor:theme.palette.primary.main
        }
      }
    },
  });

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, set] = useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={vTabs}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="1" {...a11yProps(0)} />
          <Tab label="2" {...a11yProps(1)} />
          <Tab label="3" {...a11yProps(2)} />
          <Tab label="4" {...a11yProps(3)} />
          <Tab label="5" {...a11yProps(4)} />
       
        </Tabs>
        <div style={{width:'100%',height:'100%'}}>
          
            <TabPanel value={value} index={0} >
              <div className={classes.tabBody}>
                <div className={classes.description}> 
                  <Typography align='left' variant='h1'>
                    Create your account
                  </Typography>
                  <Typography align='left' variant='h3'>
                    Join Brainfolio to link with your colleagues and showcase your portfolio 
                  </Typography>
                  <Button variant="contained" color={theme.palette.primary.main} className={classes.btn}  href="auth/signUp/1"> 
                    Get started
                  </Button>
                </div>
                <div className={classes.imgdesc}> 
                  <img style={{maxWidth:'100%',maxHeight:'90%'}} src={step1} alt="create your account"/> 
                </div>
              </div>
            </TabPanel>
          
            <TabPanel value={value} index={1}>
              <div className={classes.tabBody}>
                <div className={classes.description}> 
                  <Typography align='left' variant='h1'>
                    Edit your Portfolio Profile
                  </Typography>
                  <Typography align='left' variant='h3'>
                    Add your contact details and your profile picture along with a background image of choice
                  </Typography>     
                </div>
                <div className={classes.imgdesc}> 
                  <img style={{maxWidth:'100%',maxHeight:'90%'}} src={step2} alt="edit your portfolio"/> 
                </div>
              </div>
            </TabPanel>
        
          <TabPanel value={value} index={2}>
            <div className={classes.tabBody}>
              <div className={classes.description}> 
                <Typography align='left' variant='h1'>
                  Add your Education history, Experiences and Projects
                </Typography>
                <Typography align='left' variant='h3'>
                  Showcase your education history, experiences and skills by uploading your previous projects with description
                </Typography>     
              </div>
              <div className={classes.imgdesc}> 
                <img style={{maxWidth:'100%',maxHeight:'90%'}}  src={step3} alt="add your history"/> 
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className={classes.tabBody}>
              <div className={classes.description}> 
                <Typography align='left' variant='h1'>
                  Add a custom section of choice
                </Typography>
                <Typography align='left' variant='h3'>
                  You can showcase more of your other achievements in the custom section
                </Typography>     
              </div>
              <div className={classes.imgdesc}> 
                <img style={{maxWidth:'100%',maxHeight:'90%'}}  src={step4} alt="add your history"/> 
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div className={classes.tabBody}>
              <div className={classes.description}> 
                <Typography align='left' variant='h1'>
                  Review and Share!
                </Typography>
                <Typography align='left' variant='h3'>
                  Share your portfolio to the public or your circle of trusted connections
                </Typography>     
              </div>
              <div className={classes.imgdesc}> 
                <img style={{maxWidth:'100%',maxHeight:'90%'}} src={step5} alt="share your portfolio"/> 
              </div>
            </div>
          </TabPanel>
       </div>
      </div>
    </ThemeProvider>
  );
}
function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

