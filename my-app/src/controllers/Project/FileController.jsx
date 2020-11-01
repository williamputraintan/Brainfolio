import React from 'react';
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
import pdf from '../../Assets/images/icon/pdf-icon.png'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    maxWidth: 256,
    height: 300
    // backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   flexWrap: 'nowrap',
  //   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  //   transform: 'translateZ(0)',
  //   cellHeight: '300px',
  //   padding: theme.spacing(0,0,2,)
  // },
  fileDesc: {
    overflow: "scroll"
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
    overflow: "hidden",
    textOverflow: "..."
    // color: "white",
    // width:"100%",
    // padding: theme.spacing(0,0,2)
  },
}));

export default function SingleLineGridList(projectDisplay) {
  const classes = useStyles();
  const files = projectDisplay.data;
  // const files = [[],[],[],[],[],[]]
  console.log(files)
  // let files2 = [files]
  // console.log(files2)

  return (

    <Grid container>
      <Typography variant="h4" className={classes.fileLabel}>
        Files
      </Typography>
      <Grid container className={classes.file} spacing={4}>
        {files.map((file) => (
          <Grid item key={file} xs={12} sm={4} md={4}>
            <Card className={classes.root}>
              <CardMedia
                component="img"
                alt={file[0]}
                height="216"
                image={(file[0].slice(-3))=="pdf" ? pdf : file[1]}
                title= {file[1]}
              />
              <CardContent className={classes.fileDesc}>
                <Typography className={classes.fileTitle} gutterBottom variant="body1" component="body1">
                  {file[0]}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" color="primary">
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Grid>
  );
}
