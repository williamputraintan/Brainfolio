import React from 'react';
import Error404 from "./SVG/Error404";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    height: "calc(100vh - 64px)",
    backgroundColor: theme.palette.background.paper
  },
  svg: {
    width:"100%",
  },
  title: {
    fontSize: "2.1333rem",
    fontWeight: 700,
    color: theme.palette.text.primary
  },
  caption: {
    fontSize: "1rem" ,
    color: theme.palette.text.secondary
  }
}));

function Page404() {
  const classes = useStyles();

  return (
      <div className={classes.root} maxWidth="xs">
        <Error404 className={classes.svg}/>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Error 404
        </Typography>
        <Typography className={classes.caption} variant="h3" gutterBottom>
          Sorry, but this page doesn't exists
        </Typography>
        <br/>
        <Link component={RouterLink} color="primary" to="/aboutUs">
          Back to Home
        </Link>
      </div>
  )
}

export default Page404;
