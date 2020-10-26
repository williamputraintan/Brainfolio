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
            {data.title}
        </Typography>
        {
          data.type === "Volunteer"? 
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
      
      <Typography className={classes.subTitle} variant="h3">
        {format(parseISO(data.startDate), "MMMM yy")} -  
        {format(parseISO(data.endDate), "MMMM yy")} 
      </Typography>
      <Typography className={classes.subTitle} variant="h2">
          {data.name}
      </Typography>
      <Typography className={classes.subTitle}  variant="h3">
          Job Description:<br/>
          <Typography variant="body1">
            {data.description}
          </Typography>
      </Typography>
    </div>
  )
}

export default ExperienceListItem
