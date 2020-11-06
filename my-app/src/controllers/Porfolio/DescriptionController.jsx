import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/user.context';
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
  const {state} = useContext(UserContext);
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

  if ((description.length) < 1) {
    return (
      <>
      </>
    )
  }

  return (
    <div>
      <CardAccent className={classes.root} color={accentColor}>
          
        <Typography className={classes.title} variant="h4" gutterBottom> Description</Typography>
        <Typography variant="body1">
          {description}
        </Typography>
        <br/>
      </CardAccent>
    </div>
  )
}

export default DescriptionController
