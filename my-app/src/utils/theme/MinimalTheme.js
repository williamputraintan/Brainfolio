
import { createMuiTheme }  from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    gradient: {
      background: 'linear-gradient(90deg, rgba(0,210,255,1) 0%, rgba(0,74,175,1) 100%)'
    },
    reverseGradient: {
      background: 'linear-gradient(270deg, rgba(0,210,255,1) 0%, rgba(0,74,175,1) 100%);'
    },
    primary: {
      main: '#0013FE'
    },
    secondary: {
      main: '#FE6C00',
    },
    backgroundWhite: '#ffffff',
    fontDefault: '#323232',
    fontGrey: {
      color: '#565656',
    },
    bacgroundAccent: "#ebfcff",
    errorColor: "#FF3D00",
    successColor: "#2962FF",
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
    MuiTab:{
      wrapper:{
          fontWeight:900
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1.1em",
        // color: "yellow",
        backgroundColor: "#1D3B64"
      }
    },
    MuiGridListTile: {
      root: {
        height:'250px'
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
        'Heebo',
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