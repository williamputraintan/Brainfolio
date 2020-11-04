import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import { logUserOff } from "../../context/actions/auth.actions";
import { UserContext } from "../../context/user.context.jsx";
import Paths from "../../utils/path";
import Paper from '@material-ui/core/Paper';

import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';

import Box from '@material-ui/core/Box';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

const useStyles = makeStyles((theme) => ({
  menu: {
    '& > div > ul':{
      padding: 0
    },
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  links: {
    fontWeight: 700,
    fontSize: "0.875rem"
  },
  menuDetails: {
    padding: theme.spacing(1),
    color: theme.palette.background.default,
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    '& > *:not(:first-child)': {
      padding: `0px ${theme.spacing(2)}px`,
    },
    '& > div > div:first-child': {
      marginRight: theme.spacing(3)
    }
  },
  row: {
    display: "flex"
  }
}));

function NavAvatar(props) {
  const classes = useStyles();

  const { state, dispatch } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [darkMode, setDarkMode] = React.useState(false);
  const open = Boolean(anchorEl);


  React.useEffect(() => {
    
    console.log(state)
    return () =>{
      setAnchorEl(null)
    }
  },[state])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    logUserOff(dispatch)
    setAnchorEl(null);
  }

  const onSwitchChange = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
  }

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      > 


        <Paper className={classes.menuDetails} square>
          <div className={classes.row}>
            <Avatar alt="Remy Sharp"  className={classes.large}/>
            <Typography component="div">
              <Typography component="p">
                { state.user?.username || "user"}
              </Typography>
              <Typography component="p">
                  { state.user?.email || "user@email.com"}
              </Typography>
            </Typography>
          </div>
        
        </Paper>
      
        <Divider />
        <MenuItem onClick={onSwitchChange}>
          <ListItemIcon>
            {
              darkMode? <EmojiObjectsOutlinedIcon/>: <EmojiObjectsIcon/>
            }
          </ListItemIcon>
          <Link className={classes.links} component={RouterLink} to={Paths.ABOUT_US}>Dark Mode</Link>
        </MenuItem>

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Link className={classes.links} component={RouterLink} to={Paths.EDIT_PORTFOLIO}>Settings</Link>
        </MenuItem>


        <Divider />

        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Link className={classes.links} component={RouterLink} to={Paths.ABOUT_US}>Sign Out</Link>
        </MenuItem>

      </Menu>
    </>
  )
}

export default NavAvatar;
