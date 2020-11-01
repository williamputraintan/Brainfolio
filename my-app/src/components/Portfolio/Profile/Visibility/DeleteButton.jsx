import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: red[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function DeleteButton(props) {
  const classes = useStyles();
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(false);
    props.buttonClickHandler(props.data.token)
  };
  

  const isLoading = props.loadingData == props.data.token;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to delete <b>{props.data.name}</b> access?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autofocus>
            Cancel
          </Button>
          <Button onClick={handleButtonClick} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

        <IconButton  
          aria-label="delete" 
          size="small"
          variant="contained"
          disabled={props.disableDelete}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
