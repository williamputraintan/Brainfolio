import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles }from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paths from "../../utils/path";
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 500
  },
  contentText:{

  },
  illustration:{
    textAlign: "end",
    '& > svg':{
      maxHeight: 480,
    }
  },
  textContainer:{
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  caption: {
    color: "#000B93",
    fontFamily: "Heebo,'sans-serif'"
  },
  title:{
    color: "#0013FF",
    fontFamily: "Heebo,'sans-serif'"
  },
  description:{
    color: theme.palette.text.secondary
  },
  button: {
    marginTop: theme.spacing(8),
    '& > span > a':{
      color: "#FFFFFF",
    }
  }
}));


function Slide(props) {
  const classes = useStyles();
  const data = props?.data;
  

  return (
    <div className={classes.root}>
       <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={classes.contentText}>
          <Typography className={classes.textContainer} component="div">
            <Box fontWeight="fontWeightBold" className={classes.caption}>
              STEPS
            </Box>
            <Box fontSize="h2.fontSize" fontWeight="fontWeightBold" className={classes.title}>
              {data.title}.
            </Box>
            <Box fontSize="h6.fontSize" className={classes.description}>
              {data.description}
            </Box>
            {(data.key === 1) && 
              <Button className={classes.button} variant="contained" color="primary">
                <Link component={RouterLink} to={Paths.SIGN_IN}>Sign In</Link>
              </Button>}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.illustration}>
          {data.svg}
        </Grid>
      </Grid>
      
    </div>
  )
}

export default Slide
