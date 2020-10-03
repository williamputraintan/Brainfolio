import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';

import { history } from '../../utils/BrowserHistory';

export default function Skills(){
    const classes = useStyles();

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
        <Hidden smUp><PopUpInfo title={'Technical Skills'} className={classes.popUp}/></Hidden>
        <Hidden smUp><PopUpInfo title={'Soft Skills'} className={classes.popUp}/></Hidden>
        </Container>

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
        </Container>
    )
}