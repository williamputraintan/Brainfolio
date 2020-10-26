import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import logo from "../../images/logo-transparent.png"
import NavAvatar from "../NavbarAvatar";
import Paths from "../../utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: "#333333",
    backgroundColor: "#FFF",
  },
  brand: {
    height: 50,
    margin: theme.spacing(2)
  },
  activeLink:{
    backgroundColor: {...theme.palette.primary.main},
  },
  navActions:{
    flexGrow: 1,
    margin: `0px ${theme.spacing(3)}px`,
    "& > button":{
      padding: `2px ${theme.spacing(2)}px`,
    },
    "& > button > span > a": {
      padding: 4,
      fontSize: "1rem",
      fontWeight: 600,
      color: "#676767",
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

  const {user} = props;




  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img className={classes.brand} src={logo} alt="logo"/>
          <div className={classes.navActions}>
            <Button>
              <Link component={RouterLink} to="/">Home</Link>
            </Button>
            <Button>
              <Link component={RouterLink} to="/aboutUs">About Us</Link>
            </Button>
          </div>
          <div className={classes.rightContent}>
            {
              user?.token? 
              <NavAvatar />
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