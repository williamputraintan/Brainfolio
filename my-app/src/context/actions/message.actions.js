import { SET_MESSAGE, END_MESSAGE } from "../constants";


export const setMessage = (dispatch, content) => {
  dispatch({
    type:  SET_MESSAGE,
    payload: content
  })

  setTimeout(
    dispatch({
      type:  END_MESSAGE
    })
  ,3000)

}

export const endMessage = (dispatch) => {
  dispatch({
    type:  END_MESSAGE
  })
}