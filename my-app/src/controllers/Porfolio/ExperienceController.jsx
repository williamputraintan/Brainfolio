import React, {useState, useContext} from 'react';
import { StoreContext } from '../../context/store.context';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Divider from '@material-ui/core/Divider';
import ExperienceListItem from "../../components/Portfolio/ExperienceListItem"

import AxiosInstance from "../../utils/axios";
import axios from 'axios'
import SkeletonCard from "../../common/SkeletonCard";
import CardEmpty from "../../common/CardEmpty";


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


  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState([]);
  const [work, setWork] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const {state} = useContext(StoreContext);
  const config = {
    headers: { Authorization: `Bearer ${state.user.token}` }
  };
  React.useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
   

    AxiosInstance
      .get(`/public/experience/${user}`, config)
      .then(response => {
        const data = response?.data;
        if(data) setExperience(data);
        const work = data.filter(item => item.type === "Work")
        const volunteer = data.filter(item => item.type == "Volunteer") 
        setWork(work)
        setVolunteer(volunteer)
        
        console.log("EXPPPP",data)
        console.log("WORKKK", work)
        console.log("Volunterrrr", volunteer)
      })
    
    setLoading(false);
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  },[user])

  return (

    experience.length?
    (<div id="experience">
      <CardAccent  className={classes.root} color={accentColor}>
        <Typography className={classes.title} variant="h4" gutterBottom> Experience</Typography>

        {
          loading? <SkeletonCard/>:
          work.map( (value,key)=> {
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
        {
          loading? <SkeletonCard/>:
          volunteer.map( (value,key)=> {
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
    </div>):

    <div id="experience">
      <CardAccent  className={classes.root} color={accentColor}>
        <Typography className={classes.title} variant="h4" gutterBottom> Experience</Typography>
      <CardEmpty text="The user has not entered any experience."/>
      </CardAccent>
    </div>
  )
}

export default ExperienceController
