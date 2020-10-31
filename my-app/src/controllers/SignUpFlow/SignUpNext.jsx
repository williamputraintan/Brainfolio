import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDebouncedCallback  } from 'use-debounce';
import { setUsername as postUsername, setUserLoading } from "../../context/actions/auth.actions";
import { StoreContext } from '../../context/store.context';
import useCheckUsername from "../../hooks/useCheckUsername";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';


const baseUrl = "https://testdockerprod123.herokuapp.com"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "column"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    maxWidth: 400
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2c60a6",
  },
  title:{
    fontWeight: 700,
    fontSize: "2.125rem"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card:{
    display: "flex",
    
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  profileLabel:{
    marginTop: theme.spacing(5),
    fontWeight: "1rem",
    marginLeft: theme.spacing(1) 
  },
  error: {
    borderColor: theme.palette.errorColor
  },
  success: {
    borderColor: theme.palette.successColor
  }
}));

function SignUpNext(props) {
  const classes = useStyles();
  const [username, setUsername] = React.useState("")

  const {dispatch} = React.useContext(StoreContext);
  
  const { data, loading, error } = useCheckUsername(baseUrl + "/v2/auth/check/username", username)

  function onSubmitForm(e){
    e.preventDefault();
    if(username === ""){
      return;
    }
    console.log(username)
    postUsername(dispatch, username);
  }

  const onInputChange = (e) => debounced.callback(e.target.value)
  const debounced = useDebouncedCallback(
    (value) => {
      setUsername(value);
    },400
  );


  return (
    <div className={classes.root}>
      <Typography variant="h4" class={classes.title} gutterBottom>
        Let's create a username to <br/> identify you better!
      </Typography>
       <form 
          className={classes.form} 
          onSubmit={onSubmitForm} 
          noValidate>
            
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={onInputChange}
            autoFocus
            variant="filled"
          />

          <Chip
            variant="outlined"
            label={username}
            onDelete={(e) => e.preventDefault()}
            deleteIcon={error ? <CircularProgress size="1rem"/> : <DoneIcon style={{fill:"#4AAA4D"}}/>} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={error? true: false}
            className={classes.submit}
          >
            Confirm
          </Button>
      </form>
    </div>
  )
}

export default SignUpNext
