import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExtensionIcon from '@material-ui/icons/Extension';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';
import { HashLink } from 'react-router-hash-link';


import Tooltip from '@material-ui/core/Tooltip';
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    '& > *': {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  paper: {
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.primary.main,
    
    padding: theme.spacing(1)
  },
 
}));

function MenuSection() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>

    <HashLink smooth to={`${pathname}#description`}>
      <Tooltip className={classes.tooltip} title="Description" placement="right" aria-label="Description">
        <IconButton 
          name="Description"
          aria-label="Description">
          <DescriptionIcon />
        </IconButton>
      </Tooltip>

    </HashLink>
    
    <HashLink smooth to={`${pathname}#experience`}>
      <Tooltip className={classes.tooltip} title="Experience" placement="right" aria-label="Experience">
        <IconButton 
          name="Experience"
          aria-label="Experience">
          <WorkIcon />
        </IconButton>
      </Tooltip>
    </HashLink>

    <HashLink smooth to={`${pathname}#education`}>
      <Tooltip className={classes.tooltip} title="Education" placement="right" aria-label="Education">
        <IconButton 
          name="Education"
          aria-label="Education">
          <SchoolIcon />
        </IconButton>
      </Tooltip>
    </HashLink>

    <HashLink smooth to={`${pathname}#skill`}>
      <Tooltip className={classes.tooltip} title="Skill" placement="right" aria-label="Skill">
        <IconButton 
          name="Skill"
          aria-label="Skill">
          <ExtensionIcon />
        </IconButton>
      </Tooltip>
    </HashLink>

    <HashLink smooth to={`${pathname}#project`}>
      <Tooltip className={classes.tooltip} title="Project" placement="right" aria-label="Project">
        <IconButton 
          name="Project"
          aria-label="Project">
          <GroupWorkIcon />
        </IconButton>
      </Tooltip>
    </HashLink>

    </div>
     
  )
}

export default MenuSection
