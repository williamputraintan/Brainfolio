import React , {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../context/user.context';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import {history} from '../../utils/BrowserHistory';

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});


export default function AddCard() {
    const classes = useStyles();
    const {state} = useContext(UserContext);
    const username = state.user?.username

    function handleClick(){
        history.push(`/home/edit/${username}`)
    }

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

            {/*USERNAME */}
            <IconButton onClick={handleClick}>
                <Icon className="fa fa-plus-circle" style={{ fontSize: 50 }}>add_circle</Icon>
            </IconButton>
        
        </div>
    )
}
