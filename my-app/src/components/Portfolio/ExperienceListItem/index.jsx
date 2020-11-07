import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { format, parseISO  } from "date-fns";

const useStyles = makeStyles( theme => ({
  root:{
    paddingTop:theme.spacing(3),
    // padding: `${theme.spacing(3)}px 0px`,
    "& > *": {
      // marginBottom: theme.spacing(2)
    }
  },
  title:{
    fontWeight: 900,
    fontSize: "1.333rem",
    margin: theme.spacing(0)
  },
  comp:{
    fontWeight: 700,
    fontSize: "1.133rem",
    margin: theme.spacing(0)
  },
  date:{
    fontWeight: 400,
    fontSize: "1.0rem"
  },
  subTitle:{
    fontWeight: 700,
    fontSize: "1.2rem"
  },
  job:{
    fontWeight: 700,
    fontSize: "1.2rem",
    marginTop: theme.spacing(4)
  },
  desc:{
    fontWeight: 700,
    fontSize: "1rem",
    marginBottom: theme.spacing(2)
  },
  row: {
    display: "flex",
    justifyContent:"space-between",
  },
  work: {
    backgroundColor: "#1976D2",
    "& > span": {
      fontWeight:700,
      color:"#FAFAFA",
      minWidth: "80px",
      textAlign: "center"
    },
  },
  volunteer:{
    backgroundColor: "#DC004E",
    "& > span": {
      fontWeight:700,
      color:"#FAFAFA",
      minWidth: "80px",
      textAlign: "center"
    },
  }

}));


function ExperienceListItem(props) {
  const { data } = props;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.row}>
      <Typography className={classes.title} variant="h2">
          <b>{data.title}</b>
      </Typography>
        {
          data.type === "Work"? 
            <Chip
              className={classes.work}
              label="Work"
              color="primary"
              />:
            <Chip
              className={classes.volunteer}
              label="Volunteer"
              color="secondary"
            />
        }
      </div>
      <Typography className={classes.comp} variant="h3">
            {data.companyName}
        </Typography>
      <Typography className={classes.date} variant="h3">
        {format(parseISO(data.startDate), "MMMM yyyy")} -  
        {format(parseISO(data.endDate), "MMMM yyyy")} 
      </Typography>
      <Typography className={classes.subTitle} variant="h2">
          {data.name}
      </Typography>
      <Typography className={classes.job}  variant="h3">
          Job Description:<br/>
          <Typography className={classes.desc} variant="body1">
            {data.description}
          </Typography>
      </Typography>
    </div>
  )
}

export default ExperienceListItem
