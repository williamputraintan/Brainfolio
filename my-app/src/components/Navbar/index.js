import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import logo from "../../images/logo-transparent.png"

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
    flexGrow: 1
  }
 
}));

function Navbar() {
  const classes = useStyles();

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

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;