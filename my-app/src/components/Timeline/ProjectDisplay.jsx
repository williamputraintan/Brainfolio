import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import image from '../../images/logo-transparent.png'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';

import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';



import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButton from '@material-ui/core/IconButton';

import { Container } from '@material-ui/core';

import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({

  image:{
    width: '50%',
    height: '50%',
  },
  leftMargin:{
    marginLeft: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

})); 


function ProjectDisplay(project){


  
  const classes = useStyles();

  return (
        <React.Fragment>
            <Card>
              
              {/* Owner AND date post */}
              <CardActionArea>
              <CardHeader
                  avatar={
                      <Avatar className={classes.avatar}/>
                  }
                  title="Rozak Yozali"
                  subheader="September 14, 2016"
                  />
              </CardActionArea>

              {/* Project Title & Description */}
              <CardActionArea>               
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {project.projectDetails.Title}
                  </Typography>
                  <Typography variant="body" color="textSecondary" component="p">
                    {project.projectDetails.Description}
                  </Typography>
                </CardContent>
              

              {/* Project Preview         */}
                <Container maxWidth='md'>
                  <img className={classes.image} src={image}></img>
                </Container>

              </CardActionArea>

              <ActionBar/>

            </Card>

        </React.Fragment>
    )
}

export default ProjectDisplay


function DisplayComment(){

  const classes = useStyles();
  const datas = [1,2,3];

  return(
    <React.Fragment>
      
      {datas.map((data) => (
      <CardHeader
        avatar={
            <Avatar className={classes.avatar}/>
        }
        title="James Young"
        subheader="Great job mate! Really like the concept of this project"
        />

      ))}

    </React.Fragment>
  )
}

function ActionBar(){

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
    <React.Fragment>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* Comment Expand Button */}
        <IconButton
          className={classes.leftMargin}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon/>
          <ExpandMoreIcon
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          />
        </IconButton>
      </CardActions>



      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <DisplayComment/>
      </Collapse>

    </React.Fragment>
  )
}