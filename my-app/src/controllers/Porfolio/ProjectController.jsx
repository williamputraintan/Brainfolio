import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Typography from '@material-ui/core/Typography';
import ProjectListItem from "../../components/Portfolio/ProjectListItem"

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
  },
}));



const accentColor ="#8bc34a";

function ProjectController(props) {
  const classes = useStyles();


  const { user } = props;


  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
   

    AxiosInstance
      .get(`/public/allproject/${user}`)
      .then(response => {
        // const { data } = response;
        // setProjects(data);
        const data = response?.data;
        if(data) setProjects(data);
        console.log(response)
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
      <CardAccent  className={classes.root} color={accentColor}>
        <Typography className={classes.title} variant="h4" gutterBottom> Projects</Typography>
        {
          loading? <SkeletonCard/>:
          projects.map((value,key) => {
            return(
              <ProjectListItem key={key} data={value}/>
            )
          })
        }
      </CardAccent>
    </div>
  )
}

export default ProjectController
