import React, { useState, useContext} from 'react'
import { StoreContext } from '../../../context/store.context';

import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Visibility from './Visibility'
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ImageIcon from '@material-ui/icons/Image';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Axios from "axios";
import SuccessAlert from '../../../components/EditDialog/index';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  formContainer: {
    margin: 0,
    margin:"auto",
    padding: `${theme.spacing(1)}px 0`
  },
  formRow: {
    [theme.breakpoints.down('sm')]:{
      '& > div':{
        marginBottom: theme.spacing(2)
      }
    },
    [theme.breakpoints.up('sm')]:{
      '& > div':{
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(3)
      }
    },
  },
  switchLabel:{
    marginLeft: 0,
  },
  column:{
    display: "flex",
    flexDirection: "column"
  },
  chip:{
    width: "fit-content",
    marginLeft: theme.spacing(1)
  },
  uploadBtn:{
    padding: theme.spacing(1),
    textTransform: "Capitalize",
    marginBottom: theme.spacing(1)
  },
  tick:{
    color: "#2AE502"
  }
}));




const initialState = {
  title: "",
  fullname: "",
  displayEmail:"",
  phone:"",
  address:"",
  github:"",
  linkedIn:"",
  profileImage: "",
  backgroundImage: "",
  isPublic: true,
  isDarkMode: true,
  backgroundFile: null,
  avatarFile: null
}; 


const getLastPath = (path) => path.split("/").slice(-1);


// TODO: Validation and Hooks
function ContactForm() {
  const classes = useStyles();

  const [existingData,setExistingData] = useState([]);
  const [editId, setEditId] = React.useState(null);
  const [formDisable,setFormDisable]= React.useState(false);
  const [warning,setWarning] = React.useState(false);
  const [buttonClick, setButtonClick] = React.useState(false)


  const { state} = useContext(StoreContext);
  const [fields, setFields] = React.useState(initialState);
  const { register, errors, handleSubmit } = useForm();



  React.useEffect(() => {
    const source = Axios.CancelToken.source();

    setFields({
      ...fields,
      isDarkMode: state.user.darkMode,
      isPublic: String(state.user.profile.isPublic),
      displayEmail: state.user.profile.email || state.user.email,
      title: state.user.profile.title || "",
      fullname: state.user.profile.fullname || "",
      address: state.user.profile.address || "",
      phone: state.user.profile.phone || "",
      github: state.user.profile.github || "",
      linkedIn: state.user.profile.linkedIn || "",
      profileImage: state.user.profile.profileImage || "",
      backgroundImage: state.user.profile.backgroundImage || "",
      description: state.user.profile.description || ""
    })
    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };  
  },[state.user])

  const onSubmit = () => {
    const idToken = state.user.token;
    const formData = new FormData();
    
    for(const [key,value] of Object.entries(fields)){
      formData.append(key,value)
    }
    console.log(formData)

    Axios
     .post("https://testdockerprod123.herokuapp.com/v2/edit/profile/save",
      formData,
        {
          headers:{
            'Content-Type':'multipart/form-data',
            'Authorization': `Bearer ${idToken}`
          }
      })
      .then(res => {
        if(res.status === 200 || res.status === 201){
          setAlertSuccess(true)
          alert("Details updated will be available on next Log In")
        }
      })
      .catch(err => {
        console.log(err);
      })

  }

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  function onCheckedChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.checked
    })
  }

  
  function onAvatarUpload(e){
    e.preventDefault();
    console.log("Avatar", e.target.files[0])
    setFields({
      ...fields,
      avatarFile: e.target.files[0]
    })
  }

  
  function onBackgroundUpload(e){
    e.preventDefault();
    console.log("Background",e.target.files[0])
    setFields({
      ...fields,
      backgroundFile: e.target.files[0]
    }) 
  }

  const [alertSuccess, setAlertSuccess] = React.useState(false);
  function closeAlert(){
    setAlertSuccess(false);
  }
  return (
    <div>
      <SuccessAlert isOpen={alertSuccess} closeAlert={closeAlert}/>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={8}>
        <Container className={classes.formContainer} maxWidth="sm">
        <Grid container className={classes.formRow}>

        <Grid item xs={6}>
            <FormControlLabel
                className={classes.switchLabel}
                control={
                  <Switch
                    checked={fields.isDarkMode || false}
                    onChange={onCheckedChange}
                    name="isDarkMode"
                    color="primary"
                  />
                }
                labelPlacement="start"
                label="Dark Mode"
              />
          </Grid>

          <Grid item xs={6}>
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


            <TextField
              label="Title"
              value={fields.title}
              id="filled-title"
              variant="filled"
              placeholder="Software Developer"
              name="title"
              fullWidth
              onChange={onInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <AttachmentIcon />
                </InputAdornment>
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={register({pattern: "^[a-zA-Z]+$"})}
              helperText={errors.fullname && "Fullname invalid"}
              label="Full Name"
              fullWidth
              value={fields.fullname}
              id="filled-fullname"
              variant="filled"
              placeholder="John Doe"
              name="fullname"
              onChange={onInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <AccountBoxIcon />
                </InputAdornment>
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Display Email"
              value={fields.displayEmail}
              id="filled-displayEmail"
              variant="filled"
              placeholder="John.doe@email.com"
              name="displayEmail"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }}
              
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={register({pattern: "^[+0-9]*$"})}
              label="Phone"
              fullWidth
              value={fields.phone}
              id="filled-phone"
              variant="filled"
              placeholder="(61) 400123123"
              name="phone"
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              }}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Github"
              value={fields.github}
              id="filled-github"
              variant="filled"
              placeholder="www.github.com/johndoe"
              name="github"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <GitHubIcon />
                </InputAdornment>
              }}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="LinkedIn"
              value={fields.linkedIn}
              id="filled-linkedIn"
              variant="filled"
              placeholder="www.linkedin.com/johndoe"
              name="linkedIn"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <LinkedInIcon />
                </InputAdornment>
              }}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              value={fields.address}
              id="filled-address"
              variant="filled"
              placeholder="100 Elizabeth Street"
              name="address"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              }}
              onChange={onInputChange}
            />
          </Grid>    

          <Grid item xs={12}>
            <TextField
              label="Description"
              value={fields.description}
              id="filled-address"
              variant="filled"
              name="description"
              fullWidth
              placeholder="A recent graduate from the University of Melbourne with a Bachelor of Science majoring in Chemical Systems."
              multiline
              rows={5}
              onChange={onInputChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} className={classes.column}>
            <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                name="file"
                onChange={onAvatarUpload}
              />
              <label htmlFor="raised-button-file">
                <Button 
                  startIcon={<AccountCircleIcon />} 
                  fullWidth 
                  variant="outlined"
                  component="span" 
                  color="primary" 
                  endIcon={fields.avatarFile && <DoneAllIcon className={classes.tick} />}
                  className={classes.uploadBtn}>
                  Upload Profile Image
                </Button>
              </label>      
            </>
            {
              fields.profileImage &&
                <Chip
                  className={classes.chip}
                  label={getLastPath(fields.profileImage)}
                  clickable
                  color="primary"
                  onDelete={() => {setFields({...fields, avatarFile: null, profileImage: ""})}}
              />

              }
           
          </Grid>

          <Grid item xs={12} sm={6} className={classes.column}>
          <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-background-file"
                multiple
                type="file"
                name="file"
                onChange={onBackgroundUpload}
              />
              <label htmlFor="raised-background-file">
                <Button 
                  startIcon={<ImageIcon />}
                  component="span" 
                  variant="outlined"
                  fullWidth
                  endIcon={fields.backgroundFile && <DoneAllIcon className={classes.tick} />}
                  color="primary" className={classes.uploadBtn}>
                  Upload Background Image
                </Button>
              </label>      

              {
                fields.backgroundImage &&
                    <Chip
                      className={classes.chip}
                      label={getLastPath(fields.backgroundImage)}
                      clickable
                      color="primary"
                      onDelete={() => {setFields({...fields, backgroundImage: "", backgroundFile:null})}}
                />

              }
            </>


          </Grid>


        </Grid>
        
        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
          Save Progress
        </Button>

      </Container>
        </Grid>

        <Grid item xs={12} md={4}>
          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Visibility/>  
          </Container>          
        </Grid>



      </Grid>

  </div>
         

  )
}

export default ContactForm
