import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  }
}));

function SignUpNext(props) {
  const classes = useStyles();
  const [fields, setFields] = React.useState({
    username:"",
    fullname: ""
  })

  function onSubmitForm(e){
    e.preventDefault();
    if(fields.email === "" || fields.password === "" || fields.confirmPassword !== fields.password){
      return;
    }
  }

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

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

          <TextField
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="fullname"
            onChange={onInputChange}
            autoFocus
            variant="filled"
          />
        

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
          </Button>
      </form>
    </div>
  )
}

export default SignUpNext
