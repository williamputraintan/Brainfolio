
/**
 * Project page structure:
    * header
    * project title
    * description
    * files
    * authors
    * footer
 */

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './useStyles'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import SingleLineGridList from './ProjectFile';
import ProjectAuthor from './ProjectAuthor';
import { TextField } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Brainfolio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// gather it from backend
const author = [1, 2, 3];

export default function ProjectPage() {
  const classes = useStyles();

  return (
    <div className={classes.bgcolor}>      
      <main>
        <div className={classes.heroContent}>
        
          <Container maxWidth='md'>
          <Button className={classes.back}>
          <ArrowBackIcon />
          </Button>
          <br/>
          <br/>
          </Container>
          <Container maxWidth="md">
            <Typography component="h4" variant="h3" align="left" color="textPrimary" gutterBottom>
              IT Project (COMP30022)
                <IconButton className={classes.like}>
                  <FavoriteBorderIcon/>
                </IconButton>
            </Typography>
            <Typography variant="h6" align="left" color="textSecondary" paragraph>
              Put the project description here. <br/>
              can be multiple line
            </Typography>
          </Container>
        </div>

        <SingleLineGridList/>
        <ProjectAuthor/>
        <div >
          <Container className={classes.space} maxWidth="md">
            <Typography variant='h6'>
              Comments
            </Typography>
            
            <br/>
            <div className={classes.comment}>

            <TextField
              id="outlined-textarea"
              label="Comment"
              fullWidth
              multiline
              size = 'medium'
              color='primary'
              variant="outlined"
        />
            <Button className={classes.post} color="danger">
              Post
            </Button>
            </div>

            <br/>
            <br/>
            {/* comment section */}
            <div>
              <div>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            John
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            I like your design. Keep it up!
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
              <br/>
              <div>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            John
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            I like your design. Keep it up!
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </div>
          </Container>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </div>
  );
}