import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme }from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import HeroIllustration from "./SVG/HeroIllustration";





const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor: "#FEFCF7",
    padding: theme.spacing(4),
    [theme.breakpoints.up("sm")]:{
      padding: `${theme.spacing(8)}px calc(5% + ${theme.spacing(6)}px) ` 
    },
    height:"100vh",
    display: "flex"
  },
  container:{
    maxWidth: 1280,
    margin: 'auto'
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.up("md")]:{
      marginTop: `-${theme.spacing(8)}px`
    }
  },
  illustration:{
    [theme.breakpoints.down("sm")]:{
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]:{
      padding: theme.spacing(8),
      paddingLeft: theme.spacing(16)
    },
    '& > svg':{
      height: "100%",
      width: "100%"
    }
  },  
  landingTitle:{
   
    fontFamily: theme.typography.alternative,
    fontSize: "2.369rem",
    lineHeight: 1.2,
    [theme.breakpoints.up("sm")]:{
      fontSize: "3.157rem",
    }
  },
  landingSubtitle:{
    fontSize: "1rem",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]:{
      fontSize: "1.333rem",
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(3),
    }
  },
  textPrimary: {
    color: theme.palette.primary.main
  },
  textSecondary: {
    color: theme.palette.secondary.main
  },
  landingCaption:{
    marginTop: theme.spacing(1),
    display:"flex",
    fontSize: "0.875rem",
    '& > div':{
      marginRight: theme.spacing(1)
    }
  }
}));

function Hero({scrollY}) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));




  return (
    <section className={classes.root}>
       <Grid container direction={matches? 'row': 'column-reverse'} className={classes.container}>
         
          <Grid item xs={12} md={6} className={classes.content}>
            <Typography component="div" className={classes.titleWrapper}>
              <Box component="span" className={classes.landingTitle}>
                Let <span className={classes.textPrimary}>future prospects</span> know 
                about you with our <span className={classes.textSecondary}>platform.</span>
              </Box>
            </Typography>

            <Typography>
              <Box fontSize="h6.fontSize" className={classes.landingSubtitle}>
                A platform to showcase yourself as an individual and 
                your skills to anyone interested in working with you      
              </Box>
            </Typography>

            <Button variant="contained" color="primary">
              Get Started
            </Button>

            <Typography component="div" className={classes.landingCaption}>
              <Box>&middot; Free </Box>
              <Box>&middot; Easy </Box>
              <Box>&middot; Quick </Box>
            </Typography>

          </Grid>
          <Grid item xs={12} md={6} className={classes.illustration}>
            <HeroIllustration scrollY={scrollY}/>
          </Grid>
        </Grid>
    </section>
  )
}

export default Hero
