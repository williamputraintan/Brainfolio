import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { format, parseISO  } from "date-fns";


const useStyles = makeStyles( theme => ({
  root:{
    paddingTop:theme.spacing(3),
    // padding: `${theme.spacing(3)}px 0px`,
    "& > *": {
      marginBottom: theme.spacing(2)
    }
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
    justifyContent:"space-between",
  }
}));


function EducationListItem(props) {
  const { data } = props;
  const classes = useStyles();

  function showDate(data) {
    //end date is not on going
    if (data.startDate && data.endDate && !data.onGoing) {
      return(
        <Typography className={classes.subTitle} variant="body1" gutterBottom>
          {format(parseISO(data.startDate), "MMMM yyyy")} 
          &nbsp;&nbsp; - &nbsp;&nbsp; 
          {format(parseISO(data.endDate), "MMMM yyyy")}
        </Typography>)
    }//end date is on going
    else if(data.startDate&& data.onGoing){
      return(
      <Typography className={classes.subTitle} variant="body1" gutterBottom>
      {format(parseISO(data.startDate), "MMMM yyyy")} 
      &nbsp;&nbsp; - On Going
    </Typography>)
    }
    return (<></>)
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography className={classes.title} variant="h4" gutterBottom>
            {data.institution}
        </Typography>
        {showDate(data)}
      </div>
    
      <Typography className={classes.subTitle} variant="h4" gutterBottom>
          {data.degree}
          <Typography>
          {data.location}
          </Typography>
      </Typography>
   
      
      
      <Typography className={classes.desc}  variant="h3" gutterBottom>
          Score: {data.score}
      </Typography>
      </div>
  )
}

export default EducationListItem
