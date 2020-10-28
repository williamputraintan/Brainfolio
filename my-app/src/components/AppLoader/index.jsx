import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


/** Component to load stuff before rendering UI
 *  App -> Load user fromDatabase -> Load theme -> AppLoader -> ...
 *  Also to ensure dark mode is applied before render
 * **/
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(8)
    }
  }
}));

function AppLoader(props) {
  const classes = useStyles(); 
  return (
    <section className={classes.root}>
      {props.children}
    </section>
  )
}

export default AppLoader
