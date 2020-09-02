
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
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import useStyles from './useStyles'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';

import SingleLineGridList from './ProjectFile';
import ProjectAuthor from './ProjectAuthor';

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
      {/* <CssBaseline /> */}
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Project
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h4" variant="h3" align="left" color="textPrimary" gutterBottom>
              IT Project (COMP30022)
            </Typography>
            <Typography variant="h6" align="left" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
          </Container>
        </div>

        <SingleLineGridList/>
        
        <div className={classes.likeSpacing}>
            <Container maxWidth='md'>
                <Button>
                <FavoriteBorderIcon/>
                </Button>
                <Button>
                    <CommentIcon/>
                </Button>
            </Container>
        </div>

        <ProjectAuthor/>
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