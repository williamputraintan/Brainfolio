import React from 'react';
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
import { history } from '../../utils/BrowserHistory';

export default function Projects() {
    const classes = useStyles();

    var existingFiles=new FormData();

    const fakedata=[{
      visibility: "ho",
      title: "ho",
      startDate:"ho",
      endDate:"ho",
      contributor:[["dksjbksdbd","jhdbajbjs"]]}]

    const fieldNames=["Visibility", "Title", "Start Date","End Date", "Contributor"]

    // fields form
    const [fields, setFields] = React.useState({
      visibility:"",
      title: "",
      startDate:"",
      endDate:"",
      description:"",
      contributor:[]
    })


    function onFormInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    
    // file
    // const [selectedFiles,setFiles] =  React.useState([]);
    // const [selectedFiles, setSelectedFiles] = React.useState(undefined); 

    function onFileChangeUpload(e){
      const formData = new FormData()
      for(var i = 0; i<(e.target.files).length; i++) {
          formData.append('file', (e.target.files)[i])
      }
      console.log(formData.getAll('file'))
      axios.post("http://localhost:5000/projects/files", formData)
    }
  
    function displayProjects(){
      // console.log(existingFiles.getAll('files'));
    }

    function handleFormSubmit(e){
          e.preventDefault();
          const formData = new FormData(); 
        
          // send axios here
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

    const AddContributor = ()=>{
      fields.contributor.push([oneName,oneEmail]);
      console.log(fields.contributor)
    }
    const confirmAdd = ()=>{
      AddContributor();
      handleClose();
    }
    function displayContributor(){
      var res=[];
      var i;
      for(i=0;i<fields.contributor.length;i++){
        console.log(fields.contributor[i]);
        res[i]= (i+1).toString()+". "+fields.contributor[i][0]+", "+fields.contributor[i][1]
      }
      
      return res;

    }

    return (

        <Container component="main" maxWidth="lg">

          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden smDown><CardInfo title={'Projects'} datalist={fakedata} fieldNames={fieldNames}/> </Hidden>
            <Hidden mdUp><PopUpInfo  title={'Projects'} datalist={fakedata} fieldNames={fieldNames}/></Hidden>
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
                              value={fields.visibility}
                              className={classes.select}
                              name='visibility'
                              onChange={onFormInputChange}
                            >
                              <MenuItem value={'public'}>Public</MenuItem>
                              <MenuItem value={'private'}>Private</MenuItem>
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
                          id="desc"
                          placeholder="E-portfolio web application as a part of Capstone Project for COMP30022. The web app aims to enable users to showcase their skills and projects in one platform easily."
                          name="desc"
                          autoComplete="desc"
                          multiline
                          row={3}
                          onChange={onFormInputChange}                   
                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <input type="file" multiple name="file" onChange={onFileChangeUpload}/>
                        </div>
                        <Card className={classes.cardContributor}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Uploaded Files   
                            </Typography>
                            {displayProjects()}
                              {/* {displayProjects().map(res=>(
                                <div>
                                  {res?res:null} <br/>
                                </div>
                              ))} */}
                          </CardContent>
                        </Card>
                      </Grid> 
                  </Grid>
                  <Grid xs={12} sm={12}>
                      <Button
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