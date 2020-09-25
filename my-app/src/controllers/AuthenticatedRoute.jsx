import React from 'react';
import { userState } from '../Recoil/atoms';
import { useRecoilState } from "recoil";
import { logUserIn } from "../Recoil/actions";



function AuthenticatedRoute(props) {

  const [user, setUser] = useRecoilState(userState);



  const onBtnClick = () => {
    // setUser({...user,fullname: "hans"});
    // console.log(user)
    logUserIn(setUser);
  }; 

  return (
    <div>
      <button onClick={onBtnClick}>Login</button>
    </div>
  )
}

export default AuthenticatedRoute
