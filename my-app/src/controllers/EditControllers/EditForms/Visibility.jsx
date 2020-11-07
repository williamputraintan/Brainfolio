import React, { useContext ,useEffect} from 'react';
import { StoreContext } from '../../../context/store.context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import AxiosInstance from '../../../utils/axios';
import DeleteButton from '../../../components/Visibility/DeleteButton'
import AskButton from '../../../components/Visibility/AskButton';
import AddButton from '../../../components/Visibility/AddButton'

export default function Visibility() {
    const {state} = useContext(StoreContext);
    //config header
    const config = {
        headers: { Authorization: `Bearer ${state.user.token}` }
      };

    //Adding person to the list
    const [fields, setFields] = React.useState({})

    //Existing list
    const [existingList, setExistingList] = React.useState([])

    //Buttons
    const [isOpenForm, setIsOpenForm ] = React.useState(false)
    const [buttonClick, setButtonClick] = React.useState(false)
    const [loading, setLoading] = React.useState();
    const [disableDelete, setDisableDelete] = React.useState();

    const [isAdding, setIsAdding] = React.useState(false)

    useEffect(() => {
        AxiosInstance.get(
            "/token",
            config
        ).then((response) => {
            setExistingList(response.data)
        })
    }, [buttonClick])

    //On input change
    function onInputChange(e){
        setFields({
          ...fields,
          [e.target.name]: e.target.value
        })
    }
    //OnDelete
    const handleDeleteClick = (token) => {
        if (!disableDelete) {
            setDisableDelete(true);
            setLoading(token)
            AxiosInstance.delete(
                "/token/"+token,
                config
            ).then(() => {
                //Remove the token from the existing list
                setExistingList(existingList.filter(function(value, index, arr){ return value.token != token;}));
                //Reset loading
                setLoading()
                setDisableDelete(false)
            })
        }
    };

    //On Sumbit
    const confirmAdd = ()=>{
        if(!isAdding){
            setIsAdding(true)
            setFields(fields['type'] = 'portfolio')
            AxiosInstance.post("/token/", fields, config)
            .then((response) => {
                setExistingList(existingList.concat(response.data));
                setFields({});
                setIsAdding(false)
                handleClose();
            })
            .catch(err =>{
              console.log(err);
            })
        }
    }

    const handleClickOpen = () => {
        setIsOpenForm(true);
    };
  
    const handleClose = () => {
        setIsOpenForm(false);
    };

    function displayList(data){
        return (
            <React.Fragment>
                <Grid container alignItems='center' wrap="nowrap" spacing={1}>
                    <Grid item xs={3}>
                        <Typography noWrap><b>{data.name}</b></Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography noWrap><i>{data.email}</i></Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <DeleteButton 
                            buttonClickHandler={handleDeleteClick} 
                            loadingData={loading}
                            disableDelete={disableDelete}
                            data={data}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
    //Email validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                        <Grid item xs={10} >
                            <Typography color="textSecondary" gutterBottom>
                                Visibility List
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <AskButton/>
                        </Grid>
                    </Grid>
                    <br/>
                    {existingList.map(res=>(
                    <div>
                        {res?displayList(res):null}
                    </div>
                    ))}
                    <Grid container justify='center' alignItems='center'> 
                        <IconButton variant="outlined" onClick={handleClickOpen} size="large">
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </Grid>
                </CardContent>
            </Card>

            <Dialog open={isOpenForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add People</DialogTitle>
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
                        onChange={onInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        name = "email"
                        label="Email Address"
                        type="email"
                        helperText={(!validateEmail(fields.email)) ? "Must be a valid email" : null}
                        fullWidth                       
                        onChange={onInputChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <AddButton onClick={confirmAdd} fields={fields} isAdding={isAdding}/>
                </DialogActions>
            </Dialog>
        </div>
    )
}