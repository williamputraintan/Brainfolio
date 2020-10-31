import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Container, Typography } from '@material-ui/core';
import pdf from '../../images/icon/pdf-icon.png'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    cellHeight: '300px',
    padding: theme.spacing(0,0,2,0)
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  file: {
    padding: theme.spacing(0,2,2,0)
  },
  fileLabel:{
    color: "white",
    width:"100%",
    padding: theme.spacing(2,2,2,0)
  },
}));

export default function SingleLineGridList(projectDisplay) {
  const classes = useStyles();
  const files = projectDisplay.data;
  console.log(files)
  // let files2 = [files]
  // console.log(files2)

  return (
    <Container>
      <Grid container >
        <Grid item xs={12} >
          <Typography variant="h4" className={classes.fileLabel}>
            Files Preview
          </Typography>
        </Grid>
      
        <GridList className={classes.gridList} cellHeight='350'>
          {files.map((file) => (
            <GridListTile key={file}>
              {/* {console.log(file[0].slice(-3))} */}
              {(file[0].slice(-3))=== "pdf" ? <img src={pdf}/>  : <img src={file[1]} />}
              <GridListTileBar
                title={file[0]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${file[0]}`} href={file[1]}>
                    <GetAppIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </Container>
  );
}
