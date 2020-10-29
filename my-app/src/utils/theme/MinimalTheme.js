
import { createMuiTheme }  from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    gradient: {
      background: 'linear-gradient(90deg, #041e42,#5C788F)'
    },
    reverseGradient: {
      background: 'linear-gradient(270deg, #041e42,#5C788F)'
    },
    primary: {
      main: '#1B2D57'
    },
    secondary: {
      main: '#A0CFE7',
    },
    backgroundWhite: '#ffffff',
    fontDefault: '#323232',
    fontGrey: {
      color: '#565656',
    }
  },
  overrides: {
    MuiButton: {
      contained:{
        fontWeight:700
      },
      containedPrimary: {
        fontWeight:700,
        color: 'white',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1.1em",
        // color: "yellow",
        backgroundColor: "#1D3B64"
      }
    },
  },
  typography: {
    fontFamily: [
      'Manrope',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    alternative: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',')
  },
})
export default theme