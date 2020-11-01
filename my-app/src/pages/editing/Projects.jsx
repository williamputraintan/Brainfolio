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

import CardInfo from './CardInfo.jsx';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import axios from 'axios';
import AxiosInstance from '../../utils/axios';
import Axios from 'axios';

export default function Projects() {
  
    const classes = useStyles();

    const fieldNames={
      "contributor":"Contributors",
      "projectFileName":"Project File",
      "title":"Location",
      "description":"Description",
      "startDate":"Start Date",
      "endDate":"End Date",
      "title":"Title",
      "isPublic":"Visibility",
      "youtubeLink": "youtubeLink" 
    }

    const {state} = useContext(StoreContext);

    const [allProjects, setAllProjects] =  React.useState([]);
    const [filesToUpload, setFilesToUpload] = React.useState([])
    const [filesToDelete, setFilesToDelete] = React.useState([])
    const [buttonClick, setButtonClick] = React.useState(false)
    
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
      projectFileName:[],
    })

    const config = {
      headers: { Authorization: `Bearer ${state.user.token}` }
    };

    useEffect(() => {
      AxiosInstance.get(
        "/projects/",
        config
        )
      .then((response) => {
        console.log(state.user.token);
        const responseData = response.data;
        // setAllProjects(responseData);
        setButtonClick(false)
      })
    },[buttonClick]);


    function onFormInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    function isFileAlreadyExist(fileArray){
      for(let eachFile of fileArray){
        for(let currFile of fields.projectFileName){
          console.log(eachFile.name);
          console.log(currFile[0]);
          if(eachFile.name == currFile[0]){
            
            console.log('eachFile =' , eachFile);
            console.log('currFile = ', currFile[0]);
            return false;
          }
        }
      }
      return true;
    }

    function onFileChangeUpload(e){
      setFilesToUpload(e.target.files)       
      console.log('filetoupload = ',e.target.files);
    }

    function onDeleteFile(e, fileName){
      e.preventDefault();
      setFilesToDelete(filesToDelete.concat(fileName))
      for(let i in fields.projectFileName){
        if(fileName.name == fields.projectFileName[i][0]){
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
    function isYoutubeUrl (url) {
      if(url){
        let youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
        return youtubeRegex.test(url)
      }
      return true
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
      //Sending data
      AxiosInstance.post("/projects/save/", formData, config)
      .then((response) => {
        console.log(response);
        const data = response.data
        
        setFields(data)
        setFilesToDelete([])
        setFilesToUpload([])
        setAllContributors(data.contributor)
        setButtonClick(true)
        document.getElementById('inputFile').value = ''
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

    return (
      <div style={{padding:'0 5%'}}>
        <Container component="main" maxWidth="lg">

          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden smDown><CardInfo title={'Projects'} datalist={allProjects} fieldNames={fieldNames} path={'/projects/'} toEdit={myCallback}/> </Hidden>
            <Hidden mdUp><PopUpInfo  title={'Projects'} datalist={allProjects} fieldNames={fieldNames} path={'/projects/'} toEdit={myCallback}/></Hidden>
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
                              defaultValue="2019-05-24"
                              onChange={onFormInputChange} 
                              value={fields.startDate}        
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
                              defaultValue="2019-05-24"
                              onChange={onFormInputChange} 
                              value={fields.endDate}        
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
                          <TextField 
                            id="inputFile" 
                            type="file" 
                            multiple 
                            name="files" 
                            onChange={onFileChangeUpload}
                            error={(!isFileAlreadyExist(filesToUpload))}
                            helperText={(!isFileAlreadyExist(filesToUpload)) ? "File already exist" : null}
                            />
                        </div>
                        <Card className={classes.cardContributor}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Uploaded Files   
                            </Typography>

                              {fields.projectFileName.map((res,index)=>(
                                <React.Fragment key={index}>
                                  <a href={res[1]}>{res[0]} </a>
                                  {/* <input type="button" value={res[0]} onClick={onDeleteFile} /> */}
                                  <button onClick={(e) => onDeleteFile(e, res[0])}>X</button>
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
                  <Grid xs={12} sm={12}>
                      <Button
                      disabled={!(isYoutubeUrl(fields.youtubeLink)&&isFileAlreadyExist(filesToUpload))}
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                      fullWidth
                      color='primary'
                      onClick={event=>handleFormSubmit(event) }
                      >
                      Save to my Projects
                      </Button>
                  </Grid>
                </form>
              </div>      
            </Container>
        </Container>
      </div>
    );
  }