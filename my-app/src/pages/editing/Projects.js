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

import { history } from '../../utils/BrowserHistory';

export default function Projects() {
    const classes = useStyles();

    const fakedata=[{
      visibility: "ho",
      projectTitle: "ho",
      startDate:"ho",
      endDate:"ho",
      contributors:"ho"}]

    const fieldNames=["Visibility", "Title", "Start Date","End Date", "Contributors"]

    // fields form
    const [fields, setFields] = React.useState({
      visibility:"",
      projectTitle: "",
      startDate:"",
      endDate:"",
      contributors:[]
    })

    function onFormInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    function handleFormSubmit(e){
      e.preventDefault();
      console.log('button clicked')
      history.push('/edit/projects')
    }

    // file
    const [selectedFile,setFile] =  React.useState(null);

    function onFileChangeHandler(event){
      setFile({selectedFile: event.target.files[0],
        loaded: 0,})
      console.log(event.target.files[0])
    }
    function onFileClickHandler ()  {
      const data = new FormData() 
      data.append('file', selectedFile)
      console.log(data)
    }

    //contributors
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
      fields.contributors.push([oneName,oneEmail]);
      console.log(fields.contributors)
    }
    const confirmAdd = ()=>{
      AddContributor();
      handleClose();
    }
    function displayContributors(){
      var res=[];
      var i;
      for(i=0;i<fields.contributors.length;i++){
        res[i]= (i+1).toString()+". "+fields.contributors[i][0]+", "+fields.contributors[i][1]
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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className={classes.select}
                            value={fields.visibility}
                            // onChange={handleChange}
                            >
                            <MenuItem value={'public'}>Public</MenuItem>
                            <MenuItem value={'semiPrivate'}>Semi-Private</MenuItem>
                            <MenuItem value={'private'}>Private</MenuItem>
                            </Select>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Enter Project Title </div>
                          <TextField
                          name="projectTitle"
                          variant="outlined"
                          fullWidth
                          id="projectTitle"
                          placeholder="Brainfolio"
                          autoFocus
                          onChange={onFormInputChange}                   
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <div className={classes.field}> Start Date </div>
                          <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="startDate"
                          placeholder="July 2018"
                          name="startDate"
                          autoComplete="startDate"
                          onChange={onFormInputChange}                   
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <div className={classes.field}> End Date </div>
                          <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="endDate"
                          placeholder="October 2018"
                          name="endDate"
                          autoComplete="endDate"
                          onChange={onFormInputChange}                   
                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>  
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                          Add Contributor
                        </Button>
                        <Card className={classes.cardContributors}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Contributors    
                            </Typography>
                              {displayContributors().map(res=>(
                                <div>
                                  {res} <br/>
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
                          <input type="file" name="file" onChange={(event)=> onFileChangeHandler(event)}/>
                            <label htmlFor="contained-button-file">
                              <Button variant="contained" color="primary" component="span" onClick={onFileClickHandler}>
                                Upload File
                                </Button>
                            </label>
                          </div>
                      </Grid> 
                  </Grid>
                  <Grid xs={12} sm={12}>
                      <Button
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                      fullWidth
                      color='primary'
                      onClick={event=>handleFormSubmit(event)}
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