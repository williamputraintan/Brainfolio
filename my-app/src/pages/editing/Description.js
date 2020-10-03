import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import theme from '../../utils/theme';
import { history } from '../../utils/BrowserHistory';

const descStyles = makeStyles(() => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    formContainer:{
      width:'60%', 
      float:'left',
      marginBottom:'3%',
  
    },
    listContainer:{
      padding:"5%",
      width:'40%',
      float:'right'
    },
    title: {
      fontSize: 18,
      fontFamily: theme.typography.fontFamily,
      colot:"#000",
      fontWeight: 600,
      justifyContent:'center'
    },
    submit: {
        backgroundColor:theme.palette.primary.main,
        fontFamily:theme.typography.fontFamily,
        margin: theme.spacing(3, 0, 2),
        justifyContent: 'center',
  
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
          },
    },
    field:{
        marginBottom:"3%",
        fontWeight:600
        
    }
  }));
export default function Description(){
    const classes = descStyles();

    const [fields, setFields] = React.useState({
      description:""
    })
    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    function handleSubmit(e){
      e.preventDefault();
      console.log('button clicked')
      history.push('/edit/description')
    }
    
    
    return (

        <Container component="main" maxWidth="lg">
       
        <div className={classes.paper}>
         
          <form className={classes.form} noValidate>
            <Grid container spacing={3}> 
                <Grid item xs={12} sm={12}>
                    <div className={classes.field}> Describe yourself </div>
                    <TextField
                    name="description"
                    variant="outlined"
                    fullWidth
                    id="description"
                    placeholder="A recent graduate from the University of Melbourne with a Bachelor of Science majoring in Chemical Systems. "
                    autoFocus
                    multiline
                    rows={5}
                    onChange={onInputChange}
                    />
                </Grid>
            </Grid>
            <Grid  >
                <Button
                type="submit"
                variant="contained"
                className={classes.submit}
                fullWidth
                color='primary'
                onClick={event=>handleSubmit(event)}
                >
                Save my description
                </Button>
            </Grid>
          </form>
        </div>
       
      </Container>


    )
}