import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Container } from '@material-ui/core';
import image from '../../images/logo-filled.png';


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
    cellHeight: '300px'
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));
const tileData = [
    {
        img: image,
        title: 'Title',
        author: 'Author'
    },
    // {
    //     img: image,
    //     title: 'Picture Title',
    //     author: 'Author'
    // },
    // {
    //     img: image,
    //     title: 'Title',
    //     author: 'Author'
    // },
    // {
    //     img: image,
    //     title: 'Title',
    //     author: 'Author'
    // },
    // {
    //     img: image,
    //     title: 'Title',
    //     author: 'Author'
    // },
    
]
export default function SingleLineGridList() {
  const classes = useStyles();

  return (
    <Container>
      <GridList className={classes.gridList} cellHeight='250'>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <GetAppIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}
