import React from 'react';
import { useEffect, useState} from 'react-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';

// New Import
import ProjectController from "../controllers/ProjectController";

function ProjectPage() {

  return(
      <>
          <ProjectController />
      </>
  );
}

export default ProjectPage
