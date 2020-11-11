import React , {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../context/store.context';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import {history} from '../../utils/BrowserHistory';

export default function AddCard() {
    const {state} = useContext(StoreContext);
    const username = state.user?.username

    function handleClick(){
        history.push(`/app/home/edit/${username}/projects`)
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