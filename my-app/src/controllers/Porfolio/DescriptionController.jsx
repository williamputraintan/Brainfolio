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
function DescriptionController() {
  const classes = useStyles();
  const {state} = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${state.token}` }
  };
  
  // React.useEffect(() => {
  //   AxiosInstance
  //     .get("/public/allproject/username", config)
  //     .then(res => {
  //       console.log(res)
  //     })

  // },[])


  const [description, setDescription] = useState("Lorem ipsum dolor amet")

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
            I'm diligent, love to connect with new people and do teamwork. 
                cool right? Lets meet up and talk!
                <br/>
                Looking forward to see you soon!
        </Typography>
        <br/>
      </CardAccent>
    </div>
  )
}

export default DescriptionController
