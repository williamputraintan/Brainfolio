import React,{useState} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Divider from '@material-ui/core/Divider';
import EducationListItem from "../../components/Portfolio/EducationListItem"

import AxiosInstance from "../../utils/axios";
import axios from 'axios'
import SkeletonCard from "../../common/SkeletonCard";

import useEducationAPI from "../../hooks/portfolio/useEducationAPI";


const accentColor =  "#8E44AD";


const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2)
  },
  title:{
    fontWeight: 700
  }
}));



const DataList = (props) => {
  const { data } = props
  return(
    data.map((value,key) => {
        return(
          <>
          {
            (key === data.length - 1) ?
            <EducationListItem key={key} data={value} />:
            <>
              <EducationListItem key={key} data={value} />
              <Divider />
            </>
              
          }
          </>
        
        )
      })
  )
}

function EducationController(props) {
  const classes = useStyles();
  const { user } = props;

  const {data, loading, error} = useEducationAPI(user);


  // const [loading, setLoading] = useState(true);

  console.log(error)


  return (
 
      <CardAccent className={classes.root} color={accentColor}>
        <Typography className={classes.title} variant="h4" gutterBottom> Education</Typography>
        
        { 
        loading? <SkeletonCard/>:
          <DataList data={data}/>
        }
        <br/>

      </CardAccent>
  )
}

export default EducationController
