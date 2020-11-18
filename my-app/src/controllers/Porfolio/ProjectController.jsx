import React, {useState, useContext} from 'react';
import { StoreContext } from '../../context/store.context';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Typography from '@material-ui/core/Typography';
import ProjectListItem from "../../components/Portfolio/ProjectListItem"

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
  },
}));



const accentColor ="#8bc34a";

function ProjectController(props) {
  const classes = useStyles();


  const { user } = props;


  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const {state} = useContext(StoreContext);
  const config = {
    headers: { Authorization: `Bearer ${state.user.token}` }
  };
  React.useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
   

    AxiosInstance
      .get(`/public/allproject/${user}`, config)
      .then(response => {
        // const { data } = response;
        // setProjects(data);
        const data = response?.data;
        if(data) setProjects(data);
      })
    
    setLoading(false);
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  },[user])

  return (
    <div id="project">
      
      { projects.length?
        (<CardAccent  className={classes.root} color={accentColor}>
          <Typography className={classes.title} variant="h4" gutterBottom> Projects</Typography>
            {
              loading? <SkeletonCard/>:
              projects.map((value,key) => {
                return(
                  <ProjectListItem key={key} data={value}/>
                )
              })
            }
        </CardAccent> ):
        <CardAccent  className={classes.root} color={accentColor}>
          <Typography className={classes.title} variant="h4" gutterBottom> Projects</Typography>
          <CardEmpty text="The user has not uploaded any project currently."/>
        </CardAccent>
      }
    </div>
  )
}

export default ProjectController
