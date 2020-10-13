import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
import AxiosInstance  from "../../utils/axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';

// import AxiosInstance from "../../utils/axios";
// import axios from 'axios';
import { history } from '../../utils/BrowserHistory';

export default function Contact(props) {
    const {state} = useContext(UserContext);
    const classes = useStyles();

    const [fields, setFields] = React.useState({
      title: "",
      fullName: "",
      email:"",
      phone:"",
      address:"",
      relevantLink: "",
      linkedIn:"",
      description: ""
    })

    const [existingData,setExistingData] = useState([]);

    const fieldNames = ["Title", "Full Name", "Email","Phone Number","Address", "Relevant Link","LinkedIn","Description"]
   
    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    function handleSubmit(e){
      e.preventDefault();
      AxiosInstance.post('http://localhost:5000/edit/profile',{username:state.user,...fields});
    }
    function getExistingProfile(){
      AxiosInstance.get("http://localhost:5000/edit/profile/"+state.user)
      .then(res=> setExistingData(res.data))
      
    }
    useEffect(() => {
      getExistingProfile();
    });

    return (
     
        <Container component="main" maxWidth="lg">

          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden mdDown><CardInfo title={'Contact'} datalist={existingData} fieldNames={fieldNames}/> </Hidden>
            <Hidden lgUp><PopUpInfo  title={'Contact'} datalist={existingData} fieldNames={fieldNames}/></Hidden>
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
                        id="phone"
                        placeholder="(61) 400123123"
                        name="phone"
                        autoComplete="phone"
                        onChange={onInputChange}
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
                        relevantLink="link"
                        autoComplete="link"
                        onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}> LinkedIn</div>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="link"
                        placeholder="linkedin.com/yourname"
                        name="linkedin"
                        autoComplete="link"
                        onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
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
                    onClick={event=>handleSubmit(event) && getExistingProfile()}
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