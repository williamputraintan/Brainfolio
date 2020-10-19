import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavbarAvatar from "../NavbarAvatar";
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( theme => ({
  bottomNav: {
    position: "absolute",
    bottom: "0",
    flexGrow: 1,
    width: "100%"
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  brand: {
    height: 18
  },
  appbar:{
    height: 56,
    width: "100%",
    backgroundColor: "#FFFFFF"
  },
  toolbar: {
    paddingLeft: 0
  }
}));

function BottomNavigationbar(props) {
  
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const {user} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" class={classes.appbar}>
        <Box boxShadow={2}>
          <Toolbar className={classes.toolbar}>
           

            {
              user?.token? 
              <>
                <NavbarAvatar/>
                <Typography variant="h6" className={classes.title}>
                  User
                </Typography>
              </>
              : <Button>
                  <Link component={RouterLink} to="/signin">Sign In</Link>
                </Button>
            }
          </Toolbar>
        </Box>
      </AppBar>

      <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNav}>
        <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
      </BottomNavigation>
    </>
  )
}

export default BottomNavigationbar;
