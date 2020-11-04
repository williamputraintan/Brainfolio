import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/user.context';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Divider from '@material-ui/core/Divider';
import ExperienceListItem from "../../components/Portfolio/ExperienceListItem"

import AxiosInstance from "../../utils/axios";
import axios from 'axios'
import SkeletonCard from "../../common/SkeletonCard";


const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: `5px solid ${theme.palette.primary.main}`
  },
  title:{
    fontWeight: 700
  }
}));



const accentColor =  "#1e88e5";



function ExperienceController(props) {
  const classes = useStyles();

  const { user } = props;
  const {state} = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${state.token}` }
  };

  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    
    AxiosInstance
      .get(`/public/experience/${user}`, config)
      .then(response => {
        const data = response?.data;
        if(data) setExperience(data);
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
        <Typography className={classes.title} variant="h4" gutterBottom> Experience</Typography>

        {
          loading? <SkeletonCard/>:
          experience.map( (value,key)=> {
            return(
              <>
                {
                  (key === experience.length - 1) ?
                    <ExperienceListItem key={key} data={value}/>:
                    <div key={key}>
                      <ExperienceListItem key={key} data={value}/>
                      <Divider />
                    </div>
                }
              </>
            )
          })
        }

      </CardAccent>
  )
}

export default ExperienceController
