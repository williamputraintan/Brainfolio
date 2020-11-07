import React, { useState, useContext ,useEffect} from 'react';
import { StoreContext } from '../../context/store.context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import CardInfo from './CardInfo.jsx';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import AxiosInstance from '../../utils/axios';
import SuccessAlert from '../../components/EditDialog/index'

export default function Projects() {
  
    const classes = useStyles();

    const fieldNames={
      "contributor":"Contributors",
      "projectFileName":"Project File",
      "title":"Location",
      "description":"Description",
      "startDate":"Start Date",
      "endDate":"End Date",
      "isPublic":"Visibility",
      "youtubeLink": "youtubeLink" 
    }

    const {state} = useContext(StoreContext);

    const [allProjects, setAllProjects] =  React.useState([]);
    const [filesToUpload, setFilesToUpload] = React.useState([])
    const [filesToDelete, setFilesToDelete] = React.useState([])
    const [isLoading,setIsLoading]= React.useState(false);
    const [onGoing, setOnGoing] = React.useState(false);
    // const [disableForm, setDisableForm] = React.useState(false)


    const [errorFileMessage, setErrorFileMessage] = React.useState()

    // fields form
    const [fields, setFields] = React.useState({
      // _id:"",
      isPublic:true,
      // title: "",
      // startDate:"",
      // endDate:"",
      // description:"",
      // youtubeLink: "",
      contributor:[],
      projectFileName:[]
    })

    const config = {
      headers: { Authorization: `Bearer ${state.user.token}` }
    };

    //Getting All project Data
    useEffect(() => {
      AxiosInstance.get(
        "/projects/",
        config
        )
      .then((response) => {
        const responseData = response.data;
        console.log(responseData)
        setAllProjects(responseData);
      })
    },[isLoading]);
    function deleteProject(projectId){
      setIsLoading(true)
      AxiosInstance.delete(
        '/projects/' + projectId,
        config
      ).then((response) =>{
        setAllProjects(allProjects.filter(function(value, index, arr){ return value._id !== response._id;}));
        setIsLoading(false)
      })
    }
    //Change input    
    function onFormInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    //inputFileCheck
    function isFileAlreadyExist(fileObjArray){
      for(let eachObjFile of fileObjArray){
        for(let currFile of fields.projectFileName){
          if(eachObjFile.name == currFile.name){ 
            return true;
          }
        }
      }
      return false;
    }
    //Filename Extension check
    function fileExtensionCheck(fileObjArray){
      for(let eachObjFile of fileObjArray){
        if(!eachObjFile.name.match(/\.(jpg|jpeg|png|gif|pdf)$/)){
          return false;
        }
      }
      return true;
    }

    //Handle file input
    function onFileChangeUpload(e){
      if(isFileAlreadyExist(e.target.files)){
        // setDisableForm(false)
        setErrorFileMessage("File already exist")
        return false;
      }
      if(e.target.files.length > 3){
        setErrorFileMessage("More than 3 file selected")
        // setDisableForm(false)
        return false;
      }
      if(!fileExtensionCheck(e.target.files)){
        // setDisableForm(false)
        setErrorFileMessage("Only jpg, jpeg, png, gif, pdf is accepted")
        return false;
      }
      setErrorFileMessage()
      setFilesToUpload(e.target.files)
    }

    //Handle file delete
    function onDeleteFile(e, fileObj){
      const fileName = fileObj.name
      e.preventDefault();
      setFilesToDelete(filesToDelete.concat(fileName))
      for(let i in fields.projectFileName){
        if(fileName == fields.projectFileName[i].name){
          fields.projectFileName.splice(i,1)
        }
      }
    }
    
    //props from children
    const myCallback = (idReceived) => {
      AxiosInstance.get("projects/item/"+idReceived, config)
      .then(res=>{
        setFields(res.data)
        }
      )
      .catch(error=>
        console.log(error))
    }
    //Youtube url check
    function isYoutubeUrl (url) {
      let youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
      if(url){
        
        return youtubeRegex.test(url)
      }
      return true
    }

    function handleOnGoing(event){
      setOnGoing(event.target.checked);
    };

    function convertISOtoYMD(isoDate){
      const date = new Date(isoDate)
      return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    }

    //Save Project Button
    function handleFormSubmit(e){
      e.preventDefault();
      console.log('onSUbmit = ',fields);
      
      const formData = new FormData();

      //New Files to Upload
      for(let eachFile of filesToUpload){
        console.log(eachFile);
        formData.append('filesToUpload', eachFile)
      }
      //Setting each contributor
      for (let each of allContributors){
        console.log(each);
        formData.append('contributor', JSON.stringify(each))
      }
      //Setting other fields
      for ( let key in fields ) {
        if(key == 'contributor'){
          continue
        }
        formData.append(key, fields[key]);
      }
      //Setting files to delete
      for(let eachFile of filesToDelete){
        formData.append('filesToDelete',eachFile)
      }

      setIsLoading(true);
      //Sending data
      AxiosInstance.post("/projects/save/", formData, config)
      .then((response) => {
        if (response.status ==200 || response.status == 201){
          setAlertSuccess(true)
          console.log(response);
          const data = response.data
          
          setFields(data)
          setFilesToDelete([])
          setFilesToUpload([])
          setAllContributors(data.contributor)
          document.getElementById('inputFile').value = ''
          setIsLoading(false);
        } else {
          throw Error
        }
        

      })
      .catch(err =>{
        console.log(err);
      })
    }
    //  --- CONTIBUTORS ---
    //contributor popup
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //Contributors Data
    const[currentContributor,setcurrentContributor] = React.useState({});
    const[allContributors, setAllContributors] = React.useState([])

    function validateEmail(email) {
      if(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      return true

    }
    const AddContributor = ()=>{
      setAllContributors(allContributors.concat(currentContributor));
      setcurrentContributor({})
    }
    const confirmAdd = ()=>{
      AddContributor();
      handleClose();
    }
    function onContributorChange(e){
      setcurrentContributor({
        ...currentContributor,
        [e.target.name]: e.target.value
      })
    }
    function displayContributor(){
      console.log(allContributors);
      var result=[];
      let number = 1;
      for(let each of allContributors){
        result.push(number.toString()+". "+each.name+", "+each.email);
        number++;
      }
      return result;
    }

    const [alertSuccess, setAlertSuccess] = React.useState(false);
    function closeAlert(){
      setAlertSuccess(false);
    }
    return (
      <div style={{padding:'0 5%'}}>
        <Container component="main" maxWidth="lg">
          <SuccessAlert isOpen={alertSuccess} closeAlert={closeAlert}/>
          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden smDown><CardInfo title={'Projects'} datalist={allProjects} fieldNames={fieldNames} path={'/projects/'} toEdit={myCallback} toDelete={deleteProject}/> </Hidden>
            <Hidden mdUp><PopUpInfo  title={'Projects'} datalist={allProjects} fieldNames={fieldNames} path={'/projects/'} toEdit={myCallback} toDelete={deleteProject}/></Hidden>
          </Container> 

          <Container component="main" maxWidth="lg" className={classes.formContainer}>
              <div className={classes.paper}>
                <form className={classes.form} noValidate>
                  <Grid container spacing={3}> 
                      <Grid item xs={12} sm={12}>
                          <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={fields.isPublic}
                              className={classes.select}
                              name='isPublic'
                              onChange={onFormInputChange}
                            >
                              <MenuItem value={true}>Public</MenuItem>
                              <MenuItem value={false}>Private</MenuItem>
                            </Select>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Enter Project Title </div>
                          <TextField
                          name="title"
                          variant="outlined"
                          fullWidth
                          id="title"
                          placeholder="Brainfolio"
                          autoFocus
                          onChange={onFormInputChange}
                          value={fields.title}          
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <div className={classes.field}> Start Date </div>
                          <TextField
                              variant="outlined"
                              id="startDate"
                              required
                              fullWidth
                              type="date"
                              name="startDate"
                              onChange={onFormInputChange} 
                              // value={convertISOtoYMD(fields.startDate)}       
                            />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <div className={classes.field}> End Date </div>
                          <TextField
                              variant="outlined"
                              id="endDate"
                              required
                              fullWidth
                              type="date"
                              name="endDate"
                              onChange={onFormInputChange} 
                              // value={convertISOtoYMD(fields.endDate)}        
                            />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={onGoing}
                                onChange={handleOnGoing}
                                color="primary"
                              />
                            }
                            label="On Going"
                          />
                        </Grid>
                      <Grid item xs={12} sm={12}>  
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                          Add Contributor
                        </Button>
            
                        <Card className={classes.cardContributor}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Contributor    
                            </Typography>
                              {displayContributor().map(res=>(
                                <div>
                                  {res?res:null} <br/>
                                </div>
                              ))}
                          </CardContent>
                        </Card>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                          <DialogTitle id="form-dialog-title">Add contributor</DialogTitle>
                          <DialogContent>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              name="name"
                              label="Name"
                              type="name"
                              style={{paddingRight:'5%'}}
                              fullWidth
                              onChange={onContributorChange}
                            />
                            <TextField
                              margin="dense"
                              id="name"
                              name = "email"
                              label="Email Address"
                              type="email"
                              helperText={(!validateEmail(currentContributor.email)) ? "Must be a valid email" : null}
                              fullWidth                       
                              onChange={onContributorChange}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={confirmAdd} color="primary" disabled={!validateEmail(currentContributor.email)}>
                              Add
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Project Description </div>
                          <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="description"
                          placeholder="E-portfolio web application as a part of Capstone Project for COMP30022. The web app aims to enable users to showcase their skills and projects in one platform easily."
                          name="description"
                          autoComplete="desc"
                          multiline
                          row={3}
                          onChange={onFormInputChange}         
                          value={fields.description}               
                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <input 
                            id="inputFile" 
                            type="file" 
                            multiple 
                            name="files" 
                            onChange={onFileChangeUpload}
                            />
                            {errorFileMessage && <Typography color="error">{errorFileMessage}</Typography>}
                        </div>
                        <Card className={classes.cardContributor}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Uploaded Files   
                            </Typography>

                              {fields.projectFileName.map((res,index)=>(
                                <React.Fragment key={index}>
                                  <a href={res.link} target="_blank">{res.name} </a>
                                  {/* <input type="button" value={res[0]} onClick={onDeleteFile} /> */}
                                  <button onClick={(e) => onDeleteFile(e, res)}>X</button>
                                  {/* <input type="button" onClick={onDeleteFile(res[0])} /> */}
                                  <br/>
                                </React.Fragment>
                                
                              ))}
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <div className={classes.field}> YouTube Link </div>
                        <TextField
                          error={(!isYoutubeUrl(fields.youtubeLink))}
                          helperText={(!isYoutubeUrl(fields.youtubeLink)) ? "Must be a YouTube Link" : null}
                          name="youtubeLink"
                          variant="outlined"
                          fullWidth
                          id="youtubeLink"
                          placeholder="https://www.youtube.com/"
                          onChange={onFormInputChange}
                          value={fields.youtubeLink}          
                          />
                      </Grid> 
                  </Grid>

                  <Grid item xs={12} sm={12} style={{marginTop:'4%'}}>
                    <Button
                      disabled={(!isYoutubeUrl(fields.youtubeLink)) || errorFileMessage || isLoading}
                      type="submit"
                      variant="contained" 
                      color="secondary" 
                      onClick={event=>handleFormSubmit(event) }
                      >
                      Save to my Projects  
                      {isLoading?<CircularProgress color="secondary" size={20}/>:null}
                    </Button>
                  </Grid>
                </form>
              </div>      
            </Container>
        </Container>
      </div>
    );
  }