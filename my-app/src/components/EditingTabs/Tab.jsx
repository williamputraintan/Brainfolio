import React from 'react';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


export default withStyles((theme) => ({
  root: {
    textTransform: 'Capitalize', 
    minWidth: 72,
    fontWeight: 700,
    fontSize: "1rem",
    color: theme.palette.text.primary,
    marginRight: theme.spacing(4),
    '&$selected': {
      color: theme.palette.primary.main,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
}))((props) => <Tab disableRipple {...props}  {...a11yProps(props.key || 0)}/>);


