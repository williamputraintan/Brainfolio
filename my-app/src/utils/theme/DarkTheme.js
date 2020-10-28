import { createMuiTheme }  from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    type:"dark",
    gradient: {
      background: 'linear-gradient(90deg, #ebfcff 0%, #afd1ff 100%)'
    },
    reverseGradient: {
      background: 'linear-gradient(90deg, #ebfcff 0%, #afd1ff 100%)'
    },
    primary: {
      main: '#ebfcff'
    },
    secondary: {
      main: '#afd1ff',
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