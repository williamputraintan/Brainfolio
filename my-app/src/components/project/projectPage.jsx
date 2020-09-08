
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
    <div>      
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
                <Button className={classes.like}>
                  <FavoriteBorderIcon/>
                </Button>
            </Typography>
            <Typography variant="h6" align="left" color="textSecondary" paragraph>
              Put the project description here. <br/>
              can be multiple line
            </Typography>
          </Container>
        </div>

        <SingleLineGridList/>
        <ProjectAuthor/>
        <div>
          <Container className={classes.space} maxWidth="md">
            <Typography>
              Comments
            </Typography>

            <div>
            <br/>
            <TextField
                  id="filled-textarea"
                  placeholder="Comment"
                  multiline
                  fullWidth
                  size='medium'
            />
            <Button className={classes.post} color="danger">
              Post
            </Button>
            </div>

            {/* comment column */}
            {/* <div className={classes.comment}>
              <Avatar className={classes.avatar}/>
              <TextField
                id="filled-textarea"
                placeholder="Comment"
                multiline
                fullWidth
                size='medium'
              />
              <Button className={classes.post} color='Primary' >
                Post
              </Button>
            </div> */}
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
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </div>
  );
}