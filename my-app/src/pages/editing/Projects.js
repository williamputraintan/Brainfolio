import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
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

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import axios from 'axios';
import AxiosInstance from '../../utils/axios';
import Axios from 'axios';

export default function Projects() {
  
    const classes = useStyles();

    var existingFiles = new FormData();

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

    const {state} = useContext(UserContext);

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
      headers: { Authorization: `Bearer ${state.token}` }
    };

    useEffect(() => {
      AxiosInstance.get(
        "/projects/",
        config
        )
      .then((response) => {
        const responseData = response.data;
        // setContributors(responseData.contributor)
        setAllProjects(responseData);
        setButtonClick(false)
      })
    },[buttonClick]);


    function onFormInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }


    function onFileChangeUpload(e){
      setFilesToUpload(e.target.files)    
    }

    function onDeleteFile(e, fileName){
      e.preventDefault();
      setFilesToDelete(filesToDelete.concat(fileName))
      for(let i in fields.projectFileName){
        if(fileName == fields.projectFileName[i][0]){
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
        console.log(youtubeRegex.test(url));
        return youtubeRegex.test(url)
      }
      return true
    }


    function handleFormSubmit(e){
      e.preventDefault();
      console.log(fields);
      
      const formData = new FormData();


      for(let eachFile of filesToUpload){
        console.log(eachFile);
        formData.append('filesToUpload', eachFile)
      }
      for (let eachContributor of contributors){
        formData.append('contributor', eachContributor)
      }
      for ( let key in fields ) {
        if(key == 'contributor'){
          continue
        }
        formData.append(key, fields[key]);
      }

      for(let eachFile of filesToDelete){
        formData.append('filesToDelete',eachFile)
      }


      AxiosInstance.post("/projects/save/", formData, config)
      .then((response) => {
        console.log(response);
        const data = response.data
        
        setFields(data)
        setFilesToDelete([])
        setFilesToUpload([])
        setContributors(data.contributor)
        setButtonClick(true)
        document.getElementById('inputFile').value = ''
      })
      .catch(err =>{
        console.log(err);
      })
    }

    //contributor
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
    const[oneName,setOneName] = React.useState("");
    const[oneEmail,setOneEmail]= React.useState("");
    const[contributors, setContributors] = React.useState([])

    const AddContributor = ()=>{
      setContributors(contributors.concat([[oneName,oneEmail]]));
    }
    const confirmAdd = ()=>{
      AddContributor();
      handleClose();
    }
    function displayContributor(){
      console.log(contributors);
      var res=[];
      var i;
      for(i=0;i<contributors.length;i++){
        res[i]= (i+1).toString()+". "+contributors[i][0]+", "+contributors[i][1]
        console.log(res);
      }
      return res;
    }

    return (

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
                              label="Name"
                              type="name"
                              style={{paddingRight:'5%'}}
                              fullWidth
                              onChange={event=>setOneName(event.target.value)}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Email Address"
                              type="email"
                              fullWidth                       
                              onChange={event=>setOneEmail(event.target.value)}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={confirmAdd} color="primary">
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
                          <input id="inputFile" type="file" multiple name="files" onChange={onFileChangeUpload}/>
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
                          autoFocus
                          onChange={onFormInputChange}
                          value={fields.youtubeLink}          
                          />
                      </Grid> 
                  </Grid>
                  <Grid xs={12} sm={12}>
                      <Button
                      disabled={(!isYoutubeUrl(fields.youtubeLink))}
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

    );
  }