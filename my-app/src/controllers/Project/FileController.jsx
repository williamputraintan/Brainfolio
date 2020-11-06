import React, {useRef} from 'react';
import { useSpring, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.cardAccent,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: 256,
    Height: 300
    // backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   flexWrap: 'nowrap',
  //   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  //   transform: 'translateZ(0)',
  //   cellHeight: '300px',
  //   padding: theme.spacing(0,0,2,)
  // },
  fileLabel: {
    padding: theme.spacing(0,0,5)
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  file: {
    padding: theme.spacing(0,0,0),
    maxHeight: "100"
  },
  fileTitle:{
  },
}));

export default function SingleLineGridList(projectDisplay) {
  const classes = useStyles();
  const files = projectDisplay.data;

  function shortenTitle(title){
    if (title.length>9){
      return title.slice(0,9)+" ..."
    }
    return title
  }

  return (
    <Grid container>
      <Typography variant="h4" className={classes.fileLabel}>
        Files
      </Typography>
      <Grid container className={classes.file} spacing={4}>
        {files.map((file) => (
          <Grid item key={file} xs={12} sm={4} md={4}>
            <CardAnimation>
            <Card className={classes.root}>
              <CardMedia
                component="img"
                alt={file[0]}
                height="216"
                image={(file[0].slice(-3))==="pdf" ? <PictureAsPdfIcon/> : file[1]}
                title= {file[1]}
              />
              <CardContent 
              // className={classes.fileDesc}
              >
                <Typography className={classes.fileTitle} gutterBottom variant="body1" component="body1">
                  {shortenTitle(file[0])}
                </Typography>
              </CardContent>

              <CardActions>
                <Button 
                size="small" 
                color="primary"
                href={file[1]}
                target="_blank">
                  Download
                </Button>
              </CardActions>
            </Card>
            </CardAnimation>
          </Grid>
        ))}
      </Grid>

    </Grid>
  );
}

function CardAnimation({children}) {
  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

  // We add this ref to card element and use in onMouseMove event to get element's offset and dimensions.
  const ref = useRef();
  
  // The useSpring hook
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

  return (
    <animated.div
      ref={ref}
      onMouseMove={({ clientX, clientY }) => { 
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));
        // Get mouse y position within card
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));
          // Set animated values based on mouse position and card dimensions
        const dampen = 50; // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.02 // Scale
        ];
        set({ xys: xys })}}
      
      onMouseLeave={() => {
        set({ xys: [0, 0, 1] });
      }}

      style={{ transform: props.xys.interpolate(trans) }}
    >
      {children}
    </animated.div>
  );
} 