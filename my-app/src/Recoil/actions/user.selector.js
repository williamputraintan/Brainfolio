import Axios from '../../utils/axios';
import { selector } from 'recoil';
import { userState } from '../atoms';

const path = `https://reqres.in/api/users?page=1`;

// use get to get global user state
export const logInUser = selector({
  key: 'logInUser',
  get: async (args) => {
    console.log("Args", args)

    const { get } = args
    const {credentials } = get(userState)

    if(credentials){
      const response = await Axios.get("/");
      return response.data;
    }
    return null
  }
});