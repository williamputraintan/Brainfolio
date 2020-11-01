import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';



export default withStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: theme.palette.primary,
  },
}))(Tabs);
