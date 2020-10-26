
import { createMuiTheme }  from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    gradient: {
      background: 'linear-gradient(90deg, #041e42,#5C788F)'
    },
    reverseGradient: {
      background: 'linear-gradient(270deg, #041e42,#5C788F)'
    },
    primary: {
      main: '#1D3B64'
    },
    secondary: {
      main: '#A0CFE7',
    },
    backgroundWhite: '#ffffff',
    fontDefault: '#323232',
    fontGrey: {
      color: '#565656',
    }
  }

})
export default theme