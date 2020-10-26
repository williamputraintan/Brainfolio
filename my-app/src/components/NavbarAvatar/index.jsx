import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  links: {
    fontWeight: 700
  }
}));

function NavAvatar(props) {
  const classes = useStyles();

  const { dispatch } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    return () =>{
      setAnchorEl(null)
    }
  },[])

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

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
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
        <MenuItem onClick={handleClose}>
          <Link to="/edit/contact">Portfolio</Link>
        </MenuItem>


        <Divider />

        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Link className={classes.links} component={RouterLink} to={Paths.ABOUT_US}>Sign Out</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default NavAvatar;
