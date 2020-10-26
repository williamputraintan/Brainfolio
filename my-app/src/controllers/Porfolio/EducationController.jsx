import React,{useState} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Divider from '@material-ui/core/Divider';
import EducationListItem from "../../components/Portfolio/EducationListItem"

import AxiosInstance from "../../utils/axios";
import axios from 'axios'
import SkeletonCard from "../../common/SkeletonCard";


const accentColor =  "#8E44AD";


const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2)
  },
  title:{
    fontWeight: 700
  }
}));

function EducationController(props) {
  const classes = useStyles();
  const { user } = props;


  const [loading, setLoading] = useState(true);
  const [education, setEducation] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
   

    AxiosInstance
      .get(`/public/education/${user}`)
      .then(response => {
        const data = response?.data;
        if(data) setEducation(data);
      })
    
    setLoading(false);
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  },[user])

  return (
 
      <CardAccent className={classes.root} color={accentColor}>
        <Typography className={classes.title} variant="h4" gutterBottom> Education</Typography>
        {
          loading? <SkeletonCard/>:
          education.map((value,key) => {
            return(
              <>
              {
                (key === education.length - 1) ?
                <EducationListItem key={key} data={value} />:
                <>
                  <EducationListItem key={key} data={value} />
                  <Divider />
                </>
                  
              }
              </>
            
            )
          })
        }
        <br/>

      </CardAccent>
  )
}

export default EducationController
