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
import EditButton from './EditButton.js'

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
        <IconButton aria-label="close" className={classes.closeButton} onClick={this.onClose}>
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

export default function ExperienceInfo(props) {
  const title = props.title
  const fieldNames = props.fieldNames;
  var data = props.datalist;

  for (var i = 0, len = data.length; i < len; i++) {
    delete data[i]._id;
    delete data[i].username;
    delete data[i].__v;
  }

  var count=0;
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(false);
    console.log(open)
  };
  const handleClose = () => {
    setOpen(true);
    console.log(open)
  };

  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen()}>
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
              <ListItem style={{ display:'inline'}}>
              <div style={{float:'right'}}> <EditButton />  </div>
                {fieldNames? 
                  Object.entries(res).map(([key,value],i) => ((value!=="") &&  <div> {fieldNames[i]} : {value} </div>)) 
                  : Object.entries(res).map(([key,value],i) => ((value!=="") &&  <div> {value} </div>))
                }
              </ListItem> 
              {++count < data.length? <Divider/>:null}
              </div>
            ))}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
