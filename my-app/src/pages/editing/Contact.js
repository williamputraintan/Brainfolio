import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
import AxiosInstance  from "../../utils/axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function Contact(props) {
    const {state} = useContext(UserContext);
    const classes = useStyles();

    const fieldNames = {
      "title": "Title",
      "fullName": "Full Name",
      "email": "Email",
      "phone": "Phone Number",
      "address": "Address", 
      "relevantLink": "Relevant Link",
      "linkedIn": "LinkedIn",
      "description": "Description",
      "backgroundImageName":"Background Image",
      "profileImageName":"Profile Image"
    }

    const initialState = {
      title: "",
      fullName: "",
      email:"",
      phone:"",
      address:"",
      relevantLink: "",
      linkedIn:"",
      description: "",
      backgroundImageName:[],
      profileImageName:[]
    };
    
    const [fields, setFields] = React.useState(initialState);
    const [existingData,setExistingData] = useState([]);
    const [editId, setEditId] = React.useState(null);
    const [formDisable,setFormDisable]= React.useState(false);
    const [backgroundImg, setBackgroundImg] = React.useState([]);
    const [profileImg, setProfileImg] = React.useState([]);
    const [warning,setWarning] = React.useState(false);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
      console.log("background: "+backgroundImg[0])
      console.log("profile: "+profileImg[0])

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

      formData.append('profileImage', profileImg[0]);
      formData.append('backgroundImage', backgroundImg[0]);
      
      for ( var key in fields) {
        formData.append(key, fields[key]);
      }

      formData.append('filesToDelete',profileImg[0])
      formData.append('filesToDelete',backgroundImg[0])

      setFields({backgroundImageName:[formData.get('profileImage').name],
                  profileImageName:[formData.get('profileImage').name]})
  
      console.log('DELTE = ', formData.getAll('filesToDelete'));
      console.log('profile = ', formData.get('profileImage'));
      console.log('backg = ', formData.get('backgroundImage'));

      // only this not working , files & fields are all captured 
      // axios.post("http://localhost:5000/edit/profile/save/", formData)
      // .then(res=>res? console.log(res):console.log("dang")
      // );

      //when user edits an entry ,later handle rejections
      if(validInputs()){
        //disable form for request
        setFormDisable(true);
        if(editId!=null){
          AxiosInstance.put('edit/profile/'+editId,{...fields}).then(res=>isOkay(res.status)? resetForm(): console.log("edit failure"));
        }//when user submits a new entry
        else{
          AxiosInstance.post('/edit/profile/',{username:state.user,...fields}).then(res=>isOkay(res.status)? resetForm(): console.log("post failure"));
        }
      } else{
        // alert here incomplete fields
        setWarning(true);
      }
      
    }

    function isOkay(status){
      return (status>=200 && status<300)
    } 

    function emailIsValid (email) {
      return /\S+@\S+\.\S+/.test(email)
    }

    function getExistingProfile(){
      AxiosInstance.get("/edit/profile/user/"+state.user)
      .then(res=> res? setExistingData(res.data):null);
    }


    function resetForm(){
      //enable form once request complete
      setFormDisable(false);
      setFields({ ...initialState });
      setEditId(null);
      setWarning(false);
    }

    //props from children
    const myCallback = (dataFromChild) => {
      setFields({
        title:dataFromChild.title,
        fullName:dataFromChild.fullName,
        email:dataFromChild.email,
        phone:dataFromChild.phone,
        address:dataFromChild.address,
        relevantLink:dataFromChild.relevantLink,
        linkedIn:dataFromChild.linkedIn,
        description:dataFromChild.description
      });
      setFormDisable(false)
      setEditId(dataFromChild._id);
    }

    useEffect(() => {
      getExistingProfile();
    });

    return (
     
        <Container component="main" maxWidth="lg">

          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden mdDown><CardInfo title={'Contact'} datalist={existingData} fieldNames={fieldNames} path={'/edit/profile/'} toEdit={myCallback}/> </Hidden>
            <Hidden lgUp><PopUpInfo  title={'Contact'} datalist={existingData} fieldNames={fieldNames} path={'/edit/profile/'} toEdit={myCallback}/></Hidden>
          </Container>

          <Container component="main" maxWidth="lg" className={classes.formContainer}>
            <div className={classes.paper}>
            {warning?<Alert severity="error">Incomplete/Invalid fields input!</Alert>:null}
              <form className={classes.form} noValidate>
                <Grid container spacing={3} > 
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
                        <div className={classes.field}> Email Address *</div>
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
                        autoFocus
                        multiline
                        rows={5}
                        onChange={onInputChange}
                        />
                    </Grid>

      {/* PROFILE IMAGE */}
                    <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Your Profile Picture </div>
                      <div>
                        <input id="inputFile" type="file"  name="files" onChange={onProfileImgUpload}/>
                      </div>
                      <Card className={classes.cardContributor}>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                            Uploaded Background Image   
                          </Typography>

                            {fields.profileImageName.map((res,index)=>(
                                    <React.Fragment key={index}>
                                      <a href={res[1]}>{res[0]} </a>
                                      {/* <input type="button" value={res[0]} onClick={onDeleteFile} /> */}
                                      {/* <button onClick={(e) => onDeleteFile(e, res[0])}>X</button> */}
                                      {/* <input type="button" onClick={onDeleteFile(res[0])} /> */}
                                      <br/>
                                    </React.Fragment> 
                            ))}
                          </CardContent>
                        </Card>
                      </Grid> 
       {/* BACKGROUND IMAGE */}
                    <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Your Background image </div>
                      <div>
                        <input id="inputFile" type="file"  name="files" onChange={onBackgroundUpload}/>
                      </div>
                      <Card className={classes.cardContributor}>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                            Uploaded Background Image   
                          </Typography>

                            {fields.backgroundImageName.map((res,index)=>(
                                    <React.Fragment key={index}>
                                      <a href={res[1]}>{res[0]} </a>
                                      {/* <input type="button" value={res[0]} onClick={onDeleteFile} /> */}
                                      {/* <button onClick={(e) => onDeleteFile(e, res[0])}>X</button> */}
                                      {/* <input type="button" onClick={onDeleteFile(res[0])} /> */}
                                      <br/>
                                    </React.Fragment>
                                    
                            ))}
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
                    {formDisable?<CircularProgress color="secondary" size={20}/>:null}
                    </Button>
                </Grid>
          
              </form>
            </div>
          </Container>
      </Container>
     
    );
  }
