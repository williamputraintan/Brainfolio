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

export default function Contact() {
    const classes = useStyles();

    const [fields, setFields] = React.useState({
      title: "",
      fullName: "",
      email:"",
      phoneNumber:"",
      address:"",
      link: ""
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
      history.push('/edit/contact')
    }
  
    return (
    <Container component="main" maxWidth="lg">

      <Container component="main" maxWidth="lg" className={classes.listContainer}>
        <Card className={classes.cardRoot}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Your Details
          </Typography>
        </CardContent>
        </Card>
        <Hidden smUp><PopUpInfo  title={'Contact'}/></Hidden>
      </Container>

      <Container component="main" maxWidth="lg" className={classes.formContainer}>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
          
            <Grid container spacing={3} > 
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Title </div>
                    <TextField
                    name="title"
                    variant="outlined"
                    fullWidth
                    id="title"
                    placeholder="Ms"
                    onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Full Name </div>
                    <TextField
                    name="fullName"
                    variant="outlined"
                    fullWidth
                    id="name"
                    placeholder="Patricia Angelica"
                    onChange={onInputChange}                   
                    autoComplete='name'                 
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Email Address </div>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    placeholder="patriciaangelica@email.com"
                    name="email"
                    autoComplete="email"
                    onChange={onInputChange}              
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Phone Number</div>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    placeholder="(61) 400123123"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Address </div>
                    <TextField
                    name="address"
                    variant="outlined"
                    fullWidth
                    id="address"
                    placeholder="100 Elizabeth Street"
                    onChange={onInputChange}
                    autoComplete="address"              
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Link</div>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="link"
                    placeholder="github.com/yourname"
                    name="link"
                    autoComplete="link"
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
                Save my details
                </Button>
            </Grid>
          </form>
        </div>
      </Container>
    </Container>
    );
  }