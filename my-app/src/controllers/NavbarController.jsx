import React, { Suspense } from 'react'
import PageLoader from '../common/PageLoading';
import { useWindowWidth,} from '@react-hook/window-size';
import { StoreContext } from '../context/store.context';


//Lazy-Load Imports
const Navbar = React.lazy(() => import('../components/Navbar'))
const BottomNavbar = React.lazy(() => import('../components/BottomNav'))


 
const MOBILE_BREAKPOINTS = 600;

function NavbarController(props) {

  const windowWidth = useWindowWidth();

  const {state} = React.useContext(StoreContext);
  React.useEffect(() => {

  },[])

  return (
    <Suspense fallback={<PageLoader />}>
      {
        <>
        {
          windowWidth >= MOBILE_BREAKPOINTS ?
          <Navbar state={state}/>:
          <BottomNavbar state={state} />
        }
        </>
      }
    </Suspense>

  )
}



export default NavbarController
