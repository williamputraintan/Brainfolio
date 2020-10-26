import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardAccent from "../../common/CardAccent";
import AxiosInstance from "../../utils/axios";

const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(2)
  },
  title:{
    fontWeight: 700
  }
}));


const accentColor =  "#f44336";
function DescriptionController() {
  const classes = useStyles();

  
  // React.useEffect(() => {
  //   AxiosInstance
  //     .get("/public/allproject/username")
  //     .then(res => {
  //       console.log(res)
  //     })

  // },[])


  const [description, setDescription] = useState("Lorem ipsum dolor amet")

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
