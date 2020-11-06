import React, { useState, useContext ,useEffect} from 'react';
import { StoreContext } from '../../context/store.context';
import AxiosInstance  from "../../utils/axios";
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import CardInfo from './CardInfo.jsx';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {profileFields} from './FieldNames';

import axios from 'axios';


export default function Contact(props) {
    const {state} = useContext(StoreContext);


    const classes = useStyles();
    const config = {
      headers: { Authorization: `Bearer ${state.user.token}` }
    };
    const initialState = {
      title: "",
      fullname: "",
      displayEmail:"",
      phone:"",
      address:"",
      github: "",
      linkedIn:"",
      description: "",
      profileImageName: [],
      backgroundImageName: [],
      isPublic:false,
      isDarkMode:false,
    }; 
    
    const [fields, setFields] = React.useState(initialState);
    const [existingData,setExistingData] = useState([]);
    const [editId, setEditId] = React.useState(null);
    const [formDisable,setFormDisable]= React.useState(false);
    const [warning,setWarning] = React.useState(false);
    const [buttonClick, setButtonClick] = React.useState(false)

    const [backgroundImg, setBackgroundImg] = React.useState([]);
    const [profileImg, setProfileImg] = React.useState([]);
    const [profileToDelete, setProfileToDelete] = React.useState([])
    const [backgroundToDelete, setBackgroundToDelete] = React.useState([])

    useEffect(() => {
      AxiosInstance.get(
        "edit/profile/",
        config
        )
      .then((response) => {
        console.log(response);
        const responseData = response?.data;
        if(responseData)
        {
          setExistingData([responseData]);
          setButtonClick(false)
          setFields(responseData)}
      })
    },[buttonClick]);


    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    function validInputs(){
      return (fields.fullName!=="" && emailIsValid(fields.email))
    }

    function onBackgroundUpload(e){
      setBackgroundImg(e.target.files)    
    }

    function onProfileImgUpload(e){
      setProfileImg(e.target.files)    
    }

    function handleSubmit(e){
      e.preventDefault();
      
      const formData = new FormData();

      for (const key in fields) {
        formData.append(key, fields[key]);
      }

      formData.append('avatar', profileImg[0]);
      formData.append('background', backgroundImg[0]);

      
      AxiosInstance.post("/v2/edit/profile/save/", formData, config)
      .then((response) => {
        console.log(response)
        const data = response.data
        setFields(data)
        setProfileToDelete([])
        setBackgroundToDelete([])
        setButtonClick(true)
        document.getElementById('profileImage').value = ''
        document.getElementById('backgroundImage').value = ''
      })
      .catch(err =>{
        console.log(err);
      })
    }
    function onDeleteProfileFile(e, fileName){
      e.preventDefault();
      setProfileToDelete(profileToDelete.concat(fileName))
      fields.profileImageName.splice(0,1)
      console.log(fileName);
    }
    function onDeleteBackgroundFile(e, fileName){
      e.preventDefault();
      setBackgroundToDelete(backgroundToDelete.concat(fileName))
      fields.backgroundImageName.splice(0,1)
      console.log(fileName);
    }

    function isOkay(status){
      return (status>=200 && status<300)
    } 

    function emailIsValid (email) {
      return /\S+@\S+\.\S+/.test(email)
    }

    function getExistingProfile(){
      AxiosInstance.get("/edit/profile"+state.user.username)
      .then(res=> setExistingData(res.data))
      .catch(error=> console.log(error));
    }

    function resetForm(){
      //enable form once request complete
      setFormDisable(false);
      setFields({ ...initialState });
      setEditId(null);
      setWarning(false);
    }

    //props from children
    const myCallback = (idReceived) => {

      AxiosInstance.get("edit/profile/"+idReceived, config)
      .then(res=>{
        const dataFromChild = res.data
        setFields(dataFromChild);
        setFormDisable(false);
        setEditId(dataFromChild._id);
        console.log(res.data)
      })
      .catch(error=>
        console.log(error))

    }


    // useEffect(() => {
      // axios.get("http://localhost:5000/edit/profile/sa")
      // .then((response) => {
      //   const responseData = response.data;
      //   setAllProjects(responseData);
      //   setButtonClick(false)
      // })
    // },[buttonClick]);

    return (
     <div className={classes.wrapperContainer}>
        <Container component="main" maxWidth="lg" style={{backgroundColor:'#fffff'}}>

          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden mdDown><CardInfo title={'Contact'} datalist={existingData} fieldNames={profileFields} path={'/edit/profile/'} toEdit={myCallback}/> </Hidden>
            <Hidden lgUp><PopUpInfo  title={'Contact'} datalist={existingData} fieldNames={profileFields} path={'/edit/profile/'} toEdit={myCallback}/></Hidden>
          </Container>

          <Container component="main" maxWidth="lg" className={classes.formContainer}>
            <div className={classes.paper}>
            {warning?<Alert severity="error">Incomplete/Invalid fields input!</Alert>:null}
              <form className={classes.form} noValidate>
                <Grid container spacing={3} > 
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="privacylabel">Privacy</InputLabel>
                        <Select
                          labelId="privacy"
                          value={fields.isPublic}
                          className={classes.select}
                          name='isPublic'
                          onChange={onInputChange}
                        >
                          <MenuItem value={true}>Public</MenuItem>
                          <MenuItem value={false}>Private</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="privacylabel">Color Theme</InputLabel>
                          <Select
                            labelId="color_theme"
                            value={fields.color_theme}
                            className={classes.select}
                            name='color_theme'
                            onChange={onInputChange}
                          >
                            <MenuItem value={false}>Light</MenuItem>
                            <MenuItem value={true}>Dark</MenuItem>
                          </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}> Title </div>
                        <TextField
                        disabled={formDisable}
                        name="title"
                        variant="outlined"
                        fullWidth
                        placeholder="Ms"
                        value={fields.title}
                        onChange={onInputChange}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}> Full Name *</div>
                        <TextField
                        disabled={formDisable}
                        name="fullName"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="Patricia Angelica"
                        value={fields.fullName}
                        onChange={onInputChange}                   
                        autoComplete='name' 
                        error = {(fields.fullName)===""}  
                        helperText={(fields.fullName)!==""?null:"Incomplete entry"}                     
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}>(Display)Email Address *</div>
                        <TextField
                          error={!emailIsValid(fields.email)}
                          disabled={formDisable}
                          variant="outlined"
                          required
                          fullWidth
                          placeholder="patriciaangelica@email.com"
                          name="email"
                          value={fields.email}
                          autoComplete="email"
                          onChange={onInputChange}    
                          helperText={emailIsValid(fields.email)?null:"Invalid entry"}         
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}> Phone Number</div>
                        <TextField
                        disabled={formDisable}
                        variant="outlined"
                        fullWidth
                        placeholder="(61) 400123123"
                        name="phone"
                        value={fields.phone}
                        autoComplete="phone"
                        onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}> Link</div>
                        <TextField
                        disabled={formDisable}
                        variant="outlined"
                        fullWidth
                        placeholder="github.com/yourname"
                        value={fields.relevantLink}
                        name="relevantLink"
                        onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.field}> LinkedIn</div>
                        <TextField
                        disabled={formDisable}
                        variant="outlined"
                        fullWidth
                        placeholder="linkedIn.com/yourname"
                        name="linkedIn"
                        value={fields.linkedIn}
                        onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.field}> Address </div>
                        <TextField
                        disabled={formDisable}
                        name="address"
                        variant="outlined"
                        fullWidth
                        placeholder="100 Elizabeth Street"
                        onChange={onInputChange}
                        value={fields.address}
                        autoComplete="address"              
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.field}> Describe yourself </div>
                        <TextField
                        disabled={formDisable}
                        name="description"
                        variant="outlined"
                        fullWidth
                        value={fields.description}
                        placeholder="A recent graduate from the University of Melbourne with a Bachelor of Science majoring in Chemical Systems."
                        multiline
                        rows={5}
                        onChange={onInputChange}
                        />
                    </Grid>

      {/* PROFILE IMAGE */}
                    <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Your Profile Picture </div>
                      <div>
                        <input id="profileImage" type="file"  name="files" onChange={onProfileImgUpload}/>
                      </div>
                      <Card className={classes.cardContributor}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Uploaded Files   
                            </Typography>
                   
                              {Array.isArray(fields.profileImageName) && fields.profileImageName.length===2?
                                  <React.Fragment>
                                    <img src={fields.profileImageName[1]} alt='profile' width="500"/>
                                    <button onClick={(e) => onDeleteProfileFile(e, fields.profileImageName[0])}>X</button>
                                    <br/>
                                    </React.Fragment>
                              :null}
                          </CardContent>
                        </Card>
                    
                    </Grid> 
       {/* BACKGROUND IMAGE */}
                    <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Your Background image </div>
                      <div>
                        <input id="backgroundImage" type="file"  name="files" onChange={onBackgroundUpload}/>
                      </div>
                      <Card className={classes.cardContributor}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Uploaded Files   
                            </Typography>
                                  {Array.isArray(fields.backgroundImageName) && fields.backgroundImageName.length===2?
                                  <React.Fragment>
                                    <img src={fields.backgroundImageName[1]} alt='background' width="500"/>
                                    <button onClick={(e) => onDeleteBackgroundFile(e, fields.backgroundImageName[0])}>X</button>
                                    <br/>
                                    </React.Fragment>
                                    :null}
                          </CardContent>
                        </Card>
                      
                    </Grid> 
              
                  </Grid>
                <Grid>
                    <Button
                    disabled={formDisable}
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                    color='primary'
                    onClick={event=>handleSubmit(event)}
                    >
                    Save my details
                    {/* {formDisable?<CircularProgress color="secondary" size={20}/>:null} */}
                    </Button>
                </Grid>
          
              </form>
            </div>
          </Container>
      
      </Container>
    </div>
     
    );
  }