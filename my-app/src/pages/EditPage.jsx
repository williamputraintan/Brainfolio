import React, {Suspense} from 'react';
import PageLoader from '../common/PageLoading';
import { useWindowWidth,} from '@react-hook/window-size';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import Paths from "../utils/path";
import { StoreContext } from '../context/store.context';

//Lazy-Load Imports
const DesktopPage = React.lazy(() => import('../controllers/EditControllers/Mobile/main'))
const MobilePage = React.lazy(() => import('../controllers/EditControllers/Desktop'))

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      overflow: "none"
    }
  },
}));


function EditingPage(props) {

  const windowWidth = useWindowWidth();
  const classes = useStyles();
  const {state} = React.useContext(StoreContext);
  const { user } = state;

  return (
    <Suspense fallback={<PageLoader />}>
      <div className={classes.root}>
        <Switch>
          <Route path={`${Paths.EDIT_PORTFOLIO}/${user.username}`}>
            {
              (windowWidth <= 600)?
                <DesktopPage/>:
                <>
                  <MobilePage/>
                </>
            }
          </Route>
        </Switch>
      </div>
    </Suspense>
   
  )
}

export default EditingPage
