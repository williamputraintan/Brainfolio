import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme }from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";



const members = [
  {
    name: "Hanson Lynn",
    title: "Full Stack Engineer",
    imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  },
  {
    name: "Patricia",
    title: "Full Stack Engineer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  },
  {
    name: "Franklin",
    title: "Full Stack Engineer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  },
  {
    name: "William",
    title: "Full Stack Engineer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  },
  {
    name: "Andrew",
    title: "Full Stack Engineer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  },

];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(to right, #396afc, #0013FE)",
    padding: theme.spacing(4),
    [theme.breakpoints.up("sm")]:{
      padding: `${theme.spacing(8)}px calc(5% + ${theme.spacing(6)}px) ` 
    },

    '& > div':{
      height: "100%"
    }
  },
  sectionTitle: {
    color: theme.palette.background.paper ,
    fontFamily: "Heebo, 'sans-serif'",
    textAlign: "center",
    textTransform: "uppercase",
  },
  border:{
    height: 8,
    width: 80,
    backgroundColor: "#fff",
    margin:"auto"
  },
  content:{
    height: "100%",
    marginTop: theme.spacing(8)
  },
  media: {
    height: 180,
  },
  caption:{
    color: "#0013FE",
    fontWeight: 700,
    fontFamily: "Heebo, 'sans-serif'"
  },
  title:{
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    fontWeight: 700,
  },
  subtitle:{
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }
}));


function Team() {
  const classes = useStyles();

  const [ref, inView] = useInView({threshold: 0.4});
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      className={classes.root} 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1},
        hidden: { opacity: 0}
      }}>
      <Container maxWidth="md">
        <Typography className={classes.sectionTitle} variant="h2">
          Meet the team
        </Typography>
        <div className={classes.border}></div>
 
        <Grid className={classes.content} container spacing={3} justify="center">
          {
            members.map((item, key) => {
              console.log(item)
              return(
                <Grid item xs={4}>
                  <Card key={key} className={classes.card} elevation={2}>
                    <CardMedia
                      className={classes.media}
                      image={item.imageUrl}
                      title="imageurl"
                    />
                    <CardContent>
                      <Typography component="div" gutterBottom>
                        <Box className={classes.caption} fontSize="default">
                          {item.title}
                        </Box>
                        <Box className={classes.title} fontSize="h5.fontSize">
                          {item.name}
                        </Box>
                        <Box className={classes.subtitle} fontSize="default">
                          {item.description}
                        </Box>
                      </Typography>
                     
                    </CardContent>
                    <CardActions>
                      <Button size="small">View More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
               
            })
          }
        </Grid>
      </Container>
    </motion.section>
  )
}

export default Team
