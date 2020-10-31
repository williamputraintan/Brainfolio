import React from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import { StoreContext } from '../context/store.context';
import { endMessage} from "../context/actions/message.actions"

const SlideWrapper = (props) => {
  return <Slide {...props} direction="down" />;
}

function MessageSnackbar(props) {

  const {state, dispatch} = React.useContext(StoreContext);
  const { message } = state;

  const handleClose = () => {
    endMessage(dispatch)
  };

  return (
    <Snackbar
      open={state.message.show}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={handleClose}
      TransitionComponent={SlideWrapper}
      message={message.content}
      key={SlideWrapper}
    />
  )
}

export default MessageSnackbar
