import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { history } from '../../utils/BrowserHistory';

import theme from '../../utils/theme'

const skillsStyle = makeStyles(() => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
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
    formContainer:{
        width:'60%', 
        float:'left',
        marginBottom:'3%',
    
      },
      cardRoot: {
        minWidth: 235,
        minHeight:220,
        padding:'2%',
        marginBottom:'10%'
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
  }));
export default function Skills(){
    const classes = skillsStyle();
    const [fields, setFields] = React.useState({
      tech: "",
      soft: "",
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
      history.push('/edit/skills')
    }
  
    
    return (
        <Container component="main" maxWidth="lg">
        <Container component="main" maxWidth="lg" className={classes.formContainer}>

       
        <div className={classes.paper}>
         
          <form className={classes.form} noValidate>
            <Grid container spacing={3}> 
                <Grid item xs={12} sm={12}>
                    <div className={classes.field}> Enter your Technical Skills</div>
                    <TextField
                    name="tech"
                    variant="outlined"
                    fullWidth
                    id="tech"
                    placeholder="Front End: React, Angular, HTML, CSS"
                    autoFocus
                    multiline
                    rows={5}
                    onChange={onInputChange}                   
                    />
                </Grid>
                <Grid style={{marginLeft:'2%'}}>
                    <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                    color='primary'
                    onClick={event=>handleSubmit(event)}

                    >
                    Save to my Techincal Skills List
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className={classes.field}> Enter your Soft Skills</div>
                    <TextField
                    name="soft"
                    variant="outlined"
                    fullWidth
                    id="soft"
                    placeholder="Cooperative Team member"
                    autoFocus
                    multiline
                    rows={5}
                    onChange={onInputChange}                   
                    />
                </Grid>
                <Grid style={{marginLeft:'2%'}} >
                    <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                    color='primary'
                    onClick={event=>handleSubmit(event)}

                    >
                    Save to my Soft Skills List
                    </Button>
                </Grid>
            </Grid>
            
          </form>
        </div>
       
        </Container>
        <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Card className={classes.cardRoot}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Technical Skills
            </Typography>
            
            </CardContent>
            </Card>
            <Card className={classes.cardRoot}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Soft Skills
            </Typography>
            
            </CardContent>
            </Card>
        </Container>
    </Container>
    )
}