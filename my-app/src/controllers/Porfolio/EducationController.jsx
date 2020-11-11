import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import Divider from '@material-ui/core/Divider';
import EducationListItem from "../../components/Portfolio/EducationListItem"

import SkeletonCard from "../../common/SkeletonCard";

import useEducationAPI from "../../hooks/portfolio/useEducationAPI";
import CardEmpty from "../../common/CardEmpty";


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
    data.length > 0?
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
        }):
      <CardEmpty text="You have no education specified"/>
  )
}

function EducationController(props) {
  const classes = useStyles();
  const { user } = props;

  const {data, loading, error} = useEducationAPI(user);


  // const [loading, setLoading] = useState(true);

  return (
    <div id="education" >
        <CardAccent className={classes.root} color={accentColor}>
          <Typography className={classes.title} variant="h4" gutterBottom> Education</Typography>
          
          { 
          loading? <SkeletonCard/>:
            <DataList data={data}/>
          }
          <br/>

        </CardAccent>
    </div>
  )
}

export default EducationController
