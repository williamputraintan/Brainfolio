import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExtensionIcon from '@material-ui/icons/Extension';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';


import Tooltip from '@material-ui/core/Tooltip';



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
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    
    padding: theme.spacing(1)
  },
 
}));

function MenuSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip className={classes.tooltip} title="Description" placement="right" aria-label="Description">
        <IconButton 
          name="Description"
          aria-label="Description">
          <DescriptionIcon />
        </IconButton>
      </Tooltip>
    
      <Tooltip className={classes.tooltip} title="Experience" placement="right" aria-label="Experience">
        <IconButton 
          name="Experience"
          aria-label="Experience">
          <WorkIcon />
        </IconButton>
      </Tooltip>

      <Tooltip className={classes.tooltip} title="Education" placement="right" aria-label="Education">
        <IconButton 
          name="Education"
          aria-label="Education">
          <SchoolIcon />
        </IconButton>
      </Tooltip>

      <Tooltip className={classes.tooltip} title="Skill" placement="right" aria-label="Skill">
        <IconButton 
          name="Skill"
          aria-label="Skill">
          <ExtensionIcon />
        </IconButton>
      </Tooltip>

      <Tooltip className={classes.tooltip} title="Project" placement="right" aria-label="Project">
        <IconButton 
          name="Project"
          aria-label="Project">
          <GroupWorkIcon />
        </IconButton>
      </Tooltip>

    </div>
     
  )
}

export default MenuSection
