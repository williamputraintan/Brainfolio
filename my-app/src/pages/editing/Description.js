import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import {useStyles} from './Styles.js';

import { history } from '../../utils/BrowserHistory';

export default function Description(){
    const classes = useStyles();

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

            <Grid>
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