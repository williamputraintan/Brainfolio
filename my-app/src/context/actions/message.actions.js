import { SET_MESSAGE, END_MESSAGE } from "../constants";


export const setMessage = (dispatch, content) => {
  dispatch({
    type:  SET_MESSAGE,
    payload: content
  })


}

export const endMessage = (dispatch) => {
  dispatch({
    type:  END_MESSAGE
  })
}