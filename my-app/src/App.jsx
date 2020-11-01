import React  from 'react';

// Imports
import { ThemeProvider } from '@material-ui/core/styles';
import { StoreContext } from './context/store.context';
import LoadingPage from "./common/PageLoading";


//Theme
import DarkTheme from "./utils/theme/DarkTheme.js";
import LightTheme from "./utils/theme/MinimalTheme";


import AppInit from "./controllers/AppInit";



function App() {
  
  // const {} = React.useContext(UserContext);
  const {state} = React.useContext(StoreContext);
  const { darkMode } = state.user

  return (
     
      <ThemeProvider theme={darkMode? DarkTheme: LightTheme}>
        {state.isLoading && <LoadingPage /> }
        {/* <MessageSnackbar /> */}
        <AppInit />
      </ThemeProvider>
   
   
  );
}

export default App;
