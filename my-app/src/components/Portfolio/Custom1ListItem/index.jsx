import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { format, parseISO  } from "date-fns";

const useStyles = makeStyles( theme => ({
  root:{
    paddingTop:theme.spacing(1),
  },
  title:{
    fontWeight: 700,
    fontSize: "1.333rem"
  },
  subTitle:{
    fontWeight: 700,
    fontSize: "1.2rem"
  },
  desc:{
    fontWeight: 700,
    fontSize: "1rem"
  },
  row: {
    display: "flex",
    // justifyContent:"space-between",
  },
  button: {
    marginTop: theme.spacing(4),
    cursor: "pointer",
    display: "block"
  }

}));

function ProjectListItem(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <div className={classes.row}> */}
        <Typography className={classes.title} variant="h2">
            {data.itemTitle}
        </Typography>
        {/* <br/> */}
        <Typography variant="subtitle1" gutterBottom>
            {data.itemSubTitle}
        </Typography>
      {/* </div> */}

      <Typography variant="body1">
        {data.description}
      </Typography>

    </div>
  )
}

const areEqual = (prevProps, nextProps) => { return prevProps.data === nextProps.data}
const memoize = React.memo(ProjectListItem, areEqual)

export default memoize;
