import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import LogoLight from "../../Assets/images/Logo/LogoLight.png";
import LogoDark from "../../Assets/images/Logo/LogoDark.png";
import NavAvatar from "../NavbarAvatar";
import Paths from "../../utils/path";
import firebase from "../../utils/firebase";
import {getFirebaseError} from "../../utils/firebaseErrors";
import SearchBar from "../SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  brand: {
    height: '5em',
  },
  activeLink:{
    color: `${theme.palette.primary.main}!important`
  },
  navActions:{
    flexGrow: 1,
    fontSize: '1rem',

    margin: `0px ${theme.spacing(3)}px`,
    "& > button":{
      padding: `2px ${theme.spacing(2)}px`,
    },
    "& > button > span > a": {
      textTransform: "Capitalize" ,
      padding: 4,
      fontSize: "1rem",
      fontWeight: 600,
      color: theme.palette.text.secondary,
      height:"fit-content",
      "&:hover":{
        textDecoration: "none",
      }
    }
  },
  rightContent: {
    display: "flex",
    "& > button":{
      "& > span > a":{
        fontWeight: 600,
      }
    }
  },
  search: {
    minWidth: 180,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    marginRight: 16,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
 
}));

function Navbar(props) {

  const classes = useStyles();

  const {state} = props;
  const {isLoggedIn, user} = state;

  const [profileUrl,setProfileUrl] = React.useState(null)

  React.useEffect(()=> {
    const storageRef = firebase.storage().ref()
    if(user.profile?.profileImage){
      storageRef.child(user.profile.profileImage)
      .getDownloadURL()
      .then(url => setProfileUrl(url))
      .catch(err => setProfileUrl(null));
    
    }


  },[isLoggedIn, user])


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
           <Link component={RouterLink} to={Paths.ABOUT_US}>
              <img className={classes.brand} src={state.user.darkMode? LogoDark: LogoLight} alt="logo"/>
            </Link>
            <div className={classes.navActions}>
            {
              isLoggedIn &&
                <>
                  <Button>
                      <Link 
                        component={RouterLink} 
                        activeClassName={classes.activeLink} 
                        to={`${Paths.PORTFOLIO}/${user.username}`}>Portfolio</Link>
                    </Button>
                    <Button>
                      <Link 
                        component={RouterLink} 
                        activeClassName={classes.activeLink} 
                        to={`${Paths.ALL_PROJECT}/${user.username}`}>Projects</Link>
                    </Button>
                    <Button>
                      <Link 
                        component={RouterLink} 
                        activeClassName={classes.activeLink} 
                        to={`${Paths.EDIT_PORTFOLIO}/${user.username}/contact`}>Customize</Link>
                    </Button>
                  </>
              }
            </div>
           
          
          
          <div className={classes.rightContent}>
            <SearchBar />
            {
              isLoggedIn? 
              <NavAvatar profile={profileUrl}/>
              : <Button>
                  <Link component={RouterLink} to={Paths.SIGN_IN}>Sign In</Link>
                </Button>
            }
           
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar;