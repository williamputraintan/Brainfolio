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
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import EditButton from './EditButton.jsx'

//Pop Up
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
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
    maxHeight:"600px"
  }
});

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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function PopupInfo(props) {
  const title = props.title
  const fieldNames = props.fieldNames;
  var data = props.datalist;

  //for Divider usage
  var count=0;
    
  const [open, setOpen] = React.useState(false);

  //handle pop up open
  const handleClickOpen = () => {
    setOpen(true);
  };

  //handle pop up close
  const handleClose = () => {
    setOpen(false);
  };

  //disregard unwanted fields
  function checkUnwanted(key, value){
    return (key!=="_id" && key!=="username" && key!=="__v" && key!=="onGoing" && value!=="");
  }

  //pass edit id to parent component
  const myEditCallback = (idReceived) => {
    props.toEdit(idReceived)
    handleClose();
  }

  //pass delete id to parent
  const myDeleteCallback = (idReceived) => {
      props.toDelete(idReceived)
      handleClose();
  }

  //handle date for display
  function handleDate(date){
    var formatDate = date.substring(0,10);
    return formatDate;
}

  //handle value display 
  function handleValue(key,value,res){
    if(key==="startDate" || key==="endDate"){
        return handleDate(value);
    } else if(key==='isPublic'){
        if (value===true){
            return "Public"
        }else{
            return "Private"
        }
    }else{
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
            {data.map(res=>(
              <div>
                {/* end date is on going if on going is checked */}
                <div style={{display:'none'}}>{res.hasOwnProperty('onGoing') && res.onGoing?res.endDate="On Going" :null}</div>
                <ListItem style={{ display:'inline'}}>
                <div style={{float:'right'}}><EditButton id={res._id}  toEdit={myEditCallback} toDelete={myDeleteCallback} />  </div>
                  {Object.entries(res).map(([key,value],i) => 
                    (checkUnwanted(key,value) && <div> {fieldNames[key]} : 
                    {handleValue(key,value,res)}</div>)) 
                  }
                </ListItem> 
                {++count < data.length? <Divider/>:null}
              </div>
            ))}
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
