import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { format, parseISO  } from "date-fns";
import { useHistory, useLocation } from "react-router-dom";
import Paths from "../../../utils/path";


const useStyles = makeStyles( theme => ({
  root:{
    paddingTop:theme.spacing(1),
  },
  title:{
    fontWeight: 700,
    fontSize: "1.333rem"
  },
  date:{
    fontWeight: 700,
    fontSize: "1.233rem"
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
    justifyContent:"space-between",
    [theme.breakpoints.down('sm')]: {
      display: "block",
      justifyContent: "column",
    }
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
  const history = useHistory();
  const { pathname } = useLocation();


  function projectLinkClick(){
    const username = pathname.split("/")?.pop();
    if(username){
      history.push(`${Paths.PROJECT}/${username}/${data._id}`)
    }
  }

  function showDate(data) {
    if (data.startDate && data.endDate && !data.onGoing) {
      return(
        <Typography className={classes.subTitle} variant="body1" gutterBottom>
          {format(parseISO(data.startDate), "MMMM yyyy")} 
          &nbsp;&nbsp; - &nbsp;&nbsp; 
          {format(parseISO(data.endDate), "MMMM yyyy")}
        </Typography>)
    }else if(data.startDate&& data.onGoing){
      return(
      <Typography className={classes.subTitle} variant="body1" gutterBottom>
      {format(parseISO(data.startDate), "MMMM yyyy")} 
      &nbsp;&nbsp; - &nbsp;&nbsp;Present
    </Typography>)
    }
    return (<></>)
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography className={classes.title} variant="h2">
            {data.title}
        </Typography>
        {showDate(data)}

      </div>

      <Typography variant="body1">
        {data.description}
      </Typography>

      <Link className={classes.button} color="primary" onClick={projectLinkClick}>Learn More</Link>
    </div>
  )
}

const areEqual = (prevProps, nextProps) => { return prevProps.data === nextProps.data}
const memoize = React.memo(ProjectListItem, areEqual)

export default memoize;
