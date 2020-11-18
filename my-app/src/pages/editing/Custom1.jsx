import React, { useContext ,useEffect} from 'react';
import { StoreContext } from '../../context/store.context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardInfo from './CardInfo.jsx';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import AxiosInstance  from "../../utils/axios";
import {customFields} from './FieldNames';
import SuccessAlert from '../../components/EditDialog/index'
  
export default function Custom1() {
    const {state} = useContext(StoreContext);
    const classes = useStyles();
    const config = {
      headers: { Authorization: `Bearer ${state.user.token}` }
    };
   
    const initialState = {
      sectionTitle:"",
      type: "custom1",
      itemTitle: "",
      itemSubTitle: "",
      description: ""
    }

    const [fields, setFields] = React.useState(initialState);
    const [formDisable,setFormDisable]= React.useState(false);
    const [sectionTitleFinal, setSectionTitle]= React.useState("");
    const [existingData, setExistingData]= React.useState([]);
    const [editId, setEditId] = React.useState(null);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    //Create Section title 
    function handleTitleSubmit(event){
      event.preventDefault();
      setFormDisable(true);
      var finalFields = {
        username: state.user.username,
        type: fields.type,
        sectionTitle: fields.sectionTitle
      }
      AxiosInstance.post('edit/custom/sectiontitle',finalFields,config)
       .then(res=>resetSectionTitle(res.data.sectionTitle))
       .catch(err=> console.log(err));
    }

    //Handle form submit
    function handleSubmit(e){
      e.preventDefault();

      //Disable form when handling request
      setFormDisable(true);

      //Edits an entry
      if(editId!=null){
        AxiosInstance.put('edit/custom/'+editId,{username: state.user.username,...fields},config)
        .then((res)=> {
          console.log(res)
          setAlertSuccess(true)
          resetForm()
        })
        .catch(err=> console.log(err));
      }//User submits a new entry
      else{
        AxiosInstance.post('edit/custom/item',{username: state.user.username,...fields},config)
        .then((res)=> {
          if(res.status === 200 || res.status === 201){
            setAlertSuccess(true)
            resetForm()
          }
        })
        .catch(err=> console.log(err));
      }
    }
    
    //Sets custom title
    function resetSectionTitle(title){
      setSectionTitle(title);
      setFormDisable(false);
    }
    
    //Reset form
    function resetForm(){
      setFormDisable(false);
      setFields({ ...initialState });
      setEditId(null);
    }

    //Get section title
    function getSectionTitle(){
      AxiosInstance.get('edit/custom/sectiontitle/custom1',config)
      .then(res=>setSectionTitle(res.data.sectionTitle))
      .catch(error=>console.log(error));
    }

     //Get entries
    function getSectionItems(){
      AxiosInstance.get('edit/custom',config)
      .then(res=>getCustomOne(res.data))
      .catch(error=>console.log(error));
    }

    //Get custom data
    function getCustomOne(res){
      var customOne=[]
      for (var i = 0, len = res.length; i < len; i++) {
        if(res[i].type==="custom1"){
          customOne.push(res[i]);
        }
      }
      setExistingData(customOne);
    }

    //Handle entry edits
    const myEditCallback = (idReceived) => {
      setFormDisable(false);
      AxiosInstance.get("/edit/custom/"+idReceived,config)
      .then(res=> res? 
        setFields(res.data) : null)
      .catch(error=>
        console.log(error));
      setEditId(idReceived);
    }

    //Handle entry deletion
    const myDeleteCallback = (idReceived) => {
      setFormDisable(false);
      AxiosInstance.delete("/edit/custom/"+idReceived,config)
      .then(res=> res? getSectionItems(): null)
      .catch(error=>
        console.log(error));
    }

    useEffect(() => {
      getSectionTitle();
      getSectionItems();
    },[formDisable,editId]);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    function closeAlert(){
      setAlertSuccess(false);
    }
  
    return (
      <div style={{padding:'0 5%'}}>
        <Container component="main" maxWidth="lg">
          <SuccessAlert isOpen={alertSuccess} closeAlert={closeAlert}/>
          <Container component="main" maxWidth="lg" className={classes.listContainer}>
            <Hidden mdDown><CardInfo title={sectionTitleFinal? sectionTitleFinal + " Section": "Custom Section"} datalist={existingData} fieldNames={customFields} toEdit={myEditCallback} toDelete={myDeleteCallback}/> </Hidden>
            <Hidden lgUp><PopUpInfo  title={sectionTitleFinal? sectionTitleFinal + " Section": "Custom Section"} datalist={existingData} fieldNames={customFields} toEdit={myEditCallback} toDelete={myDeleteCallback}/></Hidden>
          </Container>

          <Container component="main" maxWidth="lg" className={classes.formContainer}>
              <div className={classes.paper}>
                <form className={classes.form} noValidate>
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Enter Section Title </div>
                          <TextField
                          disabled={formDisable}
                          name="sectionTitle"
                          variant="outlined"
                          fullWidth
                          id="sectionTitle"
                          placeholder={sectionTitleFinal?sectionTitleFinal:"Section Title"}
                          value={fields.sectionTitle}
                          autoFocus
                          onChange={onInputChange}                  
                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                        disabled={formDisable}
                        type="submit"
                        variant="contained" 
                        color="secondary" 
                        onClick={event=>handleTitleSubmit(event)}>
                          Save Title
                          {formDisable?<CircularProgress color="secondary" size={20}/>:null}
                        </Button>
                      </Grid>
                      <div><h3>Items </h3></div>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Title </div>
                          <TextField
                          disabled={formDisable}
                          variant="outlined"
                          required
                          fullWidth
                          id="itemTitle"
                          placeholder="Recognition"
                          name="itemTitle"
                          onChange={onInputChange}  
                          value={fields.itemTitle}               

                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Sub-Title </div>
                          <TextField
                          disabled={formDisable}
                          variant="outlined"
                          required
                          fullWidth
                          id="itemSubTitle"
                          placeholder="a web app"
                          name="itemSubTitle"
                          onChange={onInputChange}    
                          value={fields.itemSubTitle}               

                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Description </div>
                          <TextField
                          disabled={formDisable}
                          variant="outlined"
                          required
                          fullWidth
                          id="description"
                          placeholder="E-portfolio web application as a part of Capstone Project for COMP30022. The web app aims to enable users to showcase their skills and projects in one platform easily."
                          name="description"
                          onChange={onInputChange}                   
                          multiline
                          row={3}
                          value={fields.description}               
                          />
                      </Grid>              
                    </Grid>
                  <Grid item xs={12} sm={12} style={{marginTop:'4%'}}>
                    <Button
                      disabled={formDisable}
                      type="submit"
                      variant="contained" 
                      color="secondary" 
                      onClick={event=>handleSubmit(event)}>
                      Save to my {sectionTitleFinal? sectionTitleFinal: "Custom"} Section
                      {formDisable?<CircularProgress color="secondary" size={20}/>:null}
                    </Button>
                  </Grid>
                </form>
              </div>      
            </Container>
        </Container>
      </div>
    );
  }