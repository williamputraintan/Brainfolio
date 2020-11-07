import React, {useState, useContext} from 'react'
import { StoreContext } from '../../context/store.context';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import AxiosInstance from "../../utils/axios";

const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.bacgroundAccent
  },
  title:{
    fontWeight: 700
  }
}));


const accentColor =  "#f44336";
function DescriptionController(props) {
  const { user } = props;
  const classes = useStyles();
  const {state} = useContext(StoreContext);
  const [description, setDescription] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${state.token}` }
  };
  
  React.useEffect(() => {
    AxiosInstance
    .get(`/public/profile/${user}`, config)
    .then(res => {
      setDescription(res.data.user.profile.description)
        console.log("dESCCC ",res.data.user.profile)
      })

  },[])

  // const [description, setDescription] = useState("Lorem ipsum dolor amet")

  if ((description == undefined)) {
    return (<></>);
  };
  if ((description.length) < 1) {
    return (
      <>
      </>
    )
  }
  return (

    
    <div>
      <CardAccent className={classes.root} color={accentColor}>
      {
        description.length?
        (  <div>
          <Typography className={classes.title} variant="h4" gutterBottom> Description</Typography>
            <Typography variant="body1">
              {description}
          </Typography>
          <br/>
          </div>):
          <div>
            <Typography className={classes.text}>
            There is no description here.
          </Typography>
          </div>
      }
      </CardAccent>
      
    </div>
  )
}
export default DescriptionController