import React, { useContext} from 'react'
import { StoreContext } from '../../../context/store.context';

import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';


import FormTitle from "../../../common/FormTitle";
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';



import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ImageIcon from '@material-ui/icons/Image';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  formContainer: {
    margin: 0,
    padding: `${theme.spacing(1)}px 0`
  },
  formRow: {
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
  }
}));




const initialState = {
  title: "",
  fullname: "",
  email:"",
  phone:"",
  address:"",
  relevantLink: "",
  linkedIn:"",
  description: "",
  profileImage: null,
  backgroundImage: null,
  isPublic: true,
  isDarkMode: true
}; 


// TODO: Validation and Hooks
function ContactForm() {
  const classes = useStyles();
  const { state } = useContext(StoreContext);

  const [fields, setFields] = React.useState(initialState);
  const { register, errors, handleSubmit } = useForm();


  React.useEffect(() => {
    setFields({
      ...fields,
      isDarkMode: state.user.darkMode
    })
  },[])

  const onSubmit = data => console.log(data);

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
    console.log(e.target.files[0])
    setFields({
      ...fields,
      profileImage: e.target.files[0]
    })
  }

  
  function onBackgroundUpload(e){
    e.preventDefault();
    console.log(e.target.files[0])
    setFields({
      ...fields,
      backgroundImage: e.target.files[0]
    }) 
  }

  console.log(errors)
  return (

      <Container className={classes.formContainer} maxWidth="sm">
        <Grid container className={classes.formRow}>

        <Grid item xs={6}>
            <FormControlLabel
                className={classes.switchLabel}
                control={
                  <Switch
                    checked={fields.isDarkMode}
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
            <FormControlLabel
                className={classes.switchLabel}
                control={
                  <Switch
                    checked={fields.isPublic}
                    onChange={onCheckedChange}
                    name="isPublic"
                    color="primary"
                    
                  />
                }
                labelPlacement="start"
                label="Visibility"
              />
          </Grid>


          <Grid item xs={6}>


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

          <Grid item xs={6}>
            <TextField
              inputRef={register({pattern: "^[a-zA-Z]+$"})}
              helperText={errors.fullname && "Fullname invalid"}
              label="Full Name"
              fullWidth
              value={fields.fullName}
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

          <Grid item xs={6}>
            <TextField
              label="Email"
              value={fields.email}
              id="filled-email"
              variant="filled"
              placeholder="John.doe@email.com"
              name="email"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }}
              
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              inputRef={register({pattern: "^[+0-9]*$"})}
              label="Phone"
              fullWidth
              value={fields.fullName}
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <TextField
              label="LinkedIn"
              value={fields.linkedIn}
              id="filled-linkedIn"
              variant="filled"
              placeholder="www.linkedin.com/johndoe"
              name="linkedin"
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
              value={fields.address}
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
          
          <Grid item xs={6} className={classes.column}>
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
                  className={classes.uploadBtn}>
                  Upload Profile Image
                </Button>
              </label>      
            </>
            {
                fields.profileImage?.name &&
                    <Chip
                      className={classes.chip}
                      label={fields.profileImage?.name}
                      clickable
                      color="primary"
                      onDelete={() => {setFields({...fields, profileImage: null})}}
              />

              }
           
          </Grid>

          <Grid item xs={6} className={classes.column}>
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
                  color="primary" className={classes.uploadBtn}>
                  Upload Background Image
                </Button>
              </label>      

              {
                fields.backgroundImage?.name &&
                    <Chip
                      className={classes.chip}
                      label={fields.backgroundImage?.name}
                      clickable
                      color="primary"
                      onDelete={() => {setFields({...fields, backgroundImage: null})}}
              />

              }
            </>


          </Grid>


        </Grid>
        
        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
          Save Progress
        </Button>

      </Container>
  
         

  )
}

export default ContactForm
