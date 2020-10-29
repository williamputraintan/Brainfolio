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
    bacgroundAccent: "#1e2f39",
    fontAccent: "#90C5EC"
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
    MuiBottomNavigation:{
      root: {
        backgroundColor: "#1e2f39",
        color: "#90C5EC"
      },
    },
    MuiToolbar: {
      root: {
        backgroundColor: "#1e2f39"
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#1e2f39"
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1rem",
        backgroundColor: "#1e2f39",
        color: "#90C5EC"
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