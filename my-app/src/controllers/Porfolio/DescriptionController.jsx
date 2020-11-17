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
  },
  text:{
    fontWeight: 700,
    fontSize: "0.875rem",
    fontStyle: "italic",
    color: theme.palette.text.secondary
  }
}));


const accentColor =  "#f44336";
function DescriptionController(props) {
  const { user } = props;
  const [description, setDescription] = useState([]);
  const {state} = useContext(StoreContext);
  const classes = useStyles();
  const config = {
    headers: { Authorization: `Bearer ${state.user.token}` }
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

  // if ((description == undefined)) {
  //   return (<></>);
  // };
  // if ((description.length) < 1) {
  //   return (
  //     <>
  //     </>
  //   )
  // }
  return (

    
    <div>
      <CardAccent className={classes.root} color={accentColor}>
      {
        ((description==undefined) || description.length)?
        (  <div>
          <Typography className={classes.title} variant="h4" gutterBottom> Description</Typography>
            <Typography className={classes.text} variant="body1">
              <b>The user has not entered any description.</b>
          </Typography>
          <br/>
          </div>):(
          <div>
            <Typography className={classes.title} variant="h4" gutterBottom> Description</Typography>
            <Typography variant="body1">
            {description}
          </Typography>
          </div>
          )
      }
      </CardAccent>
      
    </div>
  )
}
export default DescriptionController