import React, {useContext} from 'react';
import { StoreContext, } from '../context/store.context';
import { Switch,Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import Paths from "../utils/path";

//Pages

import EditPage from "../pages/EditPage";

const AllProjectPage = React.lazy(() => import('../pages/AllProjectPage.jsx'));


function AuthenticatedRoute() {
  const {state} = useContext(StoreContext);
  const history = useHistory();
  const {pathname} = useLocation();

  React.useEffect(() => {
    if(state.user.isCompleted === false){
      history.push(Paths.SIGN_UP_2);
    }
  },[])
    
  return (
    <div>

      {
        state.user?.username ?
        <>
            {/* <Redirect from={"/home/edit"+state.user} to={"/home/edit/contact/"+state.user}  /> */}
            { (pathname === Paths.HOME) && <Redirect to={`${Paths.PORTFOLIO}/${state.user.username}`}/> }
            <Switch>
              <Route path={`${Paths.EDIT_PORTFOLIO}/:username`} component={EditPage} />
              <Route path={Paths.ALL_PROJECT} component={AllProjectPage}/>
            </Switch>
        </>
          : 
        <Redirect to={Paths.SIGN_IN}/>
      }
     
    </div>
  )
}

export default AuthenticatedRoute
