import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarAvatar from "../NavbarAvatar";
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paths from "../../utils/path";


// Icons
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SearchBar from "../SearchBar";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LogoLight from "../../Assets/images/Logo/LogoLight.png";
import LogoDark from "../../Assets/images/Logo/LogoDark.png";


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
    height: 47
  },
  appbar:{
    height: 56,
    width: "100%",
    backgroundColor: theme.palette.backgroundAccent
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper
  },
  row: {
    display: "flex",
  },
  search: {
    flexGrow: 1
  },
  imgWrapper:{
    flexGrow: 1
  }
}));

function BottomNavigationbar(props) {
  
  const classes = useStyles();
  const [value, setValue] = React.useState('portfolio');
  const history = useHistory();

  const [open,setOpen] = React.useState(true);

  const { state } = props;
  const {isLoggedIn, user} = state

  const handleChange = (event, newValue) => {
    switch(newValue){
      case "portfolio":
        history.push(`${Paths.PORTFOLIO}/${user.username}`)
        break;
      case "projects":
        history.push(`${Paths.ALL_PROJECT}/${user.username}`)
        break;
      case "account":
        history.push(`${Paths.EDIT_PORTFOLIO}/${user.username}/contact`)
        break;
      default: 
        break;
    }
    setValue(newValue);
  };


  const closeSearch = () => {
    setOpen(true);
    console.log("Close")
  }

  return (
    <>
      
      <AppBar position="static" class={classes.appbar}>
        {
          open ? 
            <Box boxShadow={2} className={classes.wrapper}>
              <Toolbar className={classes.toolbar}>
                <div className={classes.imgWrapper}>
                  <img className={classes.brand} src={state.user.darkMode? LogoDark: LogoLight} alt="logo"/>
                </div>
                <IconButton aria-label="delete" onClick={() => setOpen(false)}>
                  <SearchIcon/>
                </IconButton>
              
                  {isLoggedIn?
                    <>
                      <NavbarAvatar/>
                    </>
                    : 
                    <>
                      <Button>
                        <Link component={RouterLink} to={Paths.SIGN_IN}>Sign In</Link>
                      </Button>
                    </>
                  }
              </Toolbar>
            </Box>:
            <div className={classes.row}>
              <SearchBar  className={classes.search}/>
              <IconButton color="primary" aria-label="delete" onClick={closeSearch}>
                <CloseIcon/>
              </IconButton>
            </div>
        }
     

      </AppBar>
      
      
      {
        isLoggedIn &&  
        <div className={classes.navContainer}>
          <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNav} showLabels>
            <BottomNavigationAction label="Portfolio" value="portfolio" icon={<BusinessCenterIcon />} />
            <BottomNavigationAction label="Projects" value="projects" icon={<GroupWorkIcon />} />
            <BottomNavigationAction label="Account" value="account" icon={<AssignmentIndIcon />} />
          </BottomNavigation>
        </div>
      }
     
     
    </>
  )
}

export default BottomNavigationbar;
