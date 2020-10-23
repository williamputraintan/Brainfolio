import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import EditButton from './EditButton.js'

const styles = (theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minWidth: '300px',

  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  } ,
  
  container:{
    overflowY:"scroll",
    maxHeight:"700px",
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop:'0',
    paddingRight:'0',
    paddingLeft:'0'

  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DoubleTypeInfo(props) {
  const title = props.title
  const fieldNames = props.fieldNames;
  var tab1List = props.tab1List;
  var tab2List = props.tab2List;
  const tab1= props.type1;
  const tab2 =  props.type2;
  var path =  props.path;
  //used in Divider usage
  var count = 0;
    
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  //disregard unwanted props
  function checkUnwanted(key, value){
    return (key!=="_id" && key!=="username" && key!=="__v" && key!=="onGoing" && value!=="");
  }

  //pass to parent component
  const myEditCallback = (idReceived) => {
    props.toEdit(idReceived);
    setOpen(false);
  }

  const myDeleteCallback = (idReceived) => {
      props.toDelete(idReceived);
      setOpen(false);
  }

  function handleDate(date){
    var formatDate = date.substring(0,10);
    return formatDate;
  }   
  function handleValue(key,value,res){
      if(key==="startDate"){
          return handleDate(value);
      } else if(key==="endDate" && res.hasOwnProperty('onGoing') && !res.onGoing){
          return handleDate(value);
      } else{
          return value;
      }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Your {title}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Your {title}
        </DialogTitle>
        <DialogContent dividers className={styles.container}>
          <Typography gutterBottom>
            <div className={styles.tabRoot}>
              <AppBar position="static" color="#000">
                <Tabs value={value} indicatorColor="primary" onChange={handleChange} >
                  <Tab label={tab1} {...a11yProps(0)} />
                  <Tab label={tab2} {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                  {tab1List.map(res=>(
                  <div>
                    {/* endDate value is onGoing when ongoing is checked */}
                    <div style={{display:'none'}}>{res.hasOwnProperty('onGoing') && res.onGoing?res.endDate="On Going" :null}</div>
                    <ListItem style={{ display:'inline'}}>
                    <div style={{float:'right'}}> <EditButton path={path} id={res._id} toEdit={myEditCallback} toDelete={myDeleteCallback}/> </div>
                      {Object.entries(res).map(([key,value],i) => (checkUnwanted(key,value) && <div> {fieldNames[key]} : {handleValue(value)} </div>))}
                    </ListItem> 
                    {++count < tab1List.length? <Divider/>:null}
                    </div>
                  ))}
              </TabPanel>
              <TabPanel value={value} index={1}>
                  {tab2List.map(res=>(
                  <div>
                    {/* endDate value is onGoing when ongoing is checked */}
                    <div style={{display:'none'}}>{res.hasOwnProperty('onGoing') && res.onGoing?res.endDate="On Going" :null}</div>
                    <ListItem style={{ display:'inline'}}>
                    <div style={{float:'right'}}> <EditButton path={path} id={res._id} toEdit={myEditCallback} toDelete={myDeleteCallback} /> </div>
                      {Object.entries(res).map(([key,value],i) => (checkUnwanted(key) && <div> {fieldNames[key]} : {handleValue(key,value,res)} </div>)) }
                    </ListItem> 
                    {++count < tab2List.length? <Divider/>:null}
                    </div>
                  ))}
              </TabPanel>
            </div>            
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
