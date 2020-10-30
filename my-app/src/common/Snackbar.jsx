import React from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import { StoreContext } from '../context/store.context';
import { endMessage} from "../context/actions/message.actions"

function MessageSnackbar(props) {

  const {state, dispatch} = React.useContext(StoreContext);

  const handleClose = () => {
    endMessage(dispatch)
  };

  return (
    <Snackbar
      open={state.showMessage}
      onClose={handleClose}
      message={state.message}
    />
  )
}

export default MessageSnackbar
