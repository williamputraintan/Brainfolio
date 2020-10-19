import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {useStyles} from './Styles.js';

import { history } from '../../utils/BrowserHistory';

export default function Overview(){
    const classes = useStyles();
  
    return (

          <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
              
                <Grid container spacing={3}> 
                    <List component="list" style={{width:'100%'}}>
                        <ListItem >
                            <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Your Contact Details</div>
                            display contact details from database here aakfnadnjnakjnfdsjf
                            </Grid>
                        </ListItem>
                        <Divider /> 

                        <ListItem >
                            <Grid item xs={12} sm={12}>
                                <div className={classes.field}> Your Experiences</div>
                                display experiences from database here
                            </Grid>
                        </ListItem>
                        <Divider /> 

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.field}> Your Educations</div>
                                display educations from database here
                            </Grid>
                        </ListItem>
                        <Divider />

                        <ListItem >
                            <Grid item xs={12} sm={12}>
                                <div className={classes.field}> Your Skills</div>
                                display skills from database here
                            </Grid>
                        </ListItem>
                        <Divider />

                        <ListItem >
                            <Grid item xs={12} sm={12}>
                                <div className={classes.field}> Your Projects</div>
                                display projects from database here
                            </Grid>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.field}> Your Custom Section</div>
                                display custom section from database here
                            </Grid>
                        </ListItem>
                    </List>
                    <Grid  style={{width:'100%'}}>
                        <Button
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color='primary'
                        >
                            Save my Portfolio
                        </Button>
                    </Grid>
                  </Grid>
    
              </div>
            </Container>
    )
}