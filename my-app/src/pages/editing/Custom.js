import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { history } from '../../utils/BrowserHistory';


import theme from '../../utils/theme'

const customStyles = makeStyles(() => ({
    paper: {
      display: 'inline',
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
        
    },
    cardRoot: {
        minWidth: 235,
        minHeight:400,
        padding:'2%',
        marginBottom:'5%'
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
    select:{
        width:'30%'
    },
    contributor:{
    
        width:'48%'
    },
    itemBtn:{
        marginTop:'2%',
        marginBottom:'2%'
    }
  }));
  
  export default function Custom() {
    const classes = customStyles();
    const [fields, setFields] = React.useState({
      sectionTitle: "",
      itemTitle: "",
      subTitle:"",
      customDesc:"",
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
      history.push('/edit/custom')
    }
  
  
    return (
    <Container component="main" maxWidth="lg" >

      <Container component="main" maxWidth="lg" className={classes.formContainer}>
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Enter Section Title </div>
                      <TextField
                      name="sectionTitle"
                      variant="outlined"
                      fullWidth
                      id="sectionTitle"
                      placeholder="Awards"
                      autoFocus
                      onChange={onInputChange}                   

                      />
                  </Grid>
                  <div > <h3>Items </h3></div>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Title </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="itemTitle"
                      placeholder="Recognition "
                      name="itemTitle"
                      onChange={onInputChange}                   
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Sub-Title </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="subTitle"
                      placeholder="a web app"
                      name="subTitle"
                      onChange={onInputChange}                   
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Description </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="customDesc"
                      placeholder="E-portfolio web application as a part of Capstone Project for COMP30022. The web app aims to enable users to showcase their skills and projects in one platform easily."
                      name="customDesc"
                      onChange={onInputChange}                   
                      multiline
                      row={3}
                      />
                  </Grid>
                 
                  
              </Grid>
              <Grid xs={12} sm={12}>
                  <Button
                  type="submit"
                  variant="outlined"
                  alignItems='center'
                  color='primary'
                  className={classes.itemBtn}
                  >
                  Save to my Items List
                  </Button>
              </Grid>
              <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  alignItems='center'
                  color='primary'
                  fullWidth
                  onClick={event=>handleSubmit(event)}
                  >
                  Save my Custom Section
                  </Button>
            </form>
            </div>      
        </Container>
      <Container component="main" maxWidth="lg" className={classes.listContainer}>
        <Card className={classes.cardRoot}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Items
            </Typography>
            
            </CardContent>
            </Card>
      </Container>  
    </Container>

    );
  }