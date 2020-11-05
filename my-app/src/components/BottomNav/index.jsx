import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavbarAvatar from "../NavbarAvatar";
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paths from "../../utils/path";


// Icons
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';


const useStyles = makeStyles( theme => ({
  bottomNav: {
    position: "fixed",
    bottom: "0",
    flexGrow: 1,
    width: "100%",
    zIndex: 800,
    maxHeight: 56
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    flexGrow: 1,
  },
  brand: {
    height: 18
  },
  appbar:{
    height: 56,
    width: "100%",
    backgroundColor: theme.palette.backgroundAccent
  },
}));

function BottomNavigationbar(props) {
  
  const classes = useStyles();
  const [value, setValue] = React.useState('portfolio');
  const history = useHistory();

  const {user} = props;
  console.log(user)

  const handleChange = (event, newValue) => {
    switch(newValue){
      case "portfolio":
        history.push(`${Paths.PORTFOLIO}/${user.username}`)
        break;
      case "projects":
        history.push(`${Paths.ALL_PROJECT}`)
        break;
      case "account":
        console.log(`${Paths.EDIT_PORTFOLIO}/${user.username}`)
        history.push(`${Paths.EDIT_PORTFOLIO}/${user.username}`)
        break;
      default: 
        break;
    }
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" class={classes.appbar}>
        <Box boxShadow={2}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              Logo
            </Typography>
            {
              user?.token? 
              <>
                <NavbarAvatar/>
              </>
              : <Button>
                  <Link component={RouterLink} to={Paths.SIGN_IN}>Sign In</Link>
                </Button>
            }
          </Toolbar>
        </Box>
      </AppBar>
      
      <div className={classes.navContainer}>
        <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNav} showLabels>
          <BottomNavigationAction label="Portfolio" value="portfolio" icon={<BusinessCenterIcon />} />
          <BottomNavigationAction label="Projects" value="projects" icon={<GroupWorkIcon />} />
          <BottomNavigationAction label="Account" value="account" icon={<AssignmentIndIcon />} />
        </BottomNavigation>
      </div>
     
    </>
  )
}

export default BottomNavigationbar;
