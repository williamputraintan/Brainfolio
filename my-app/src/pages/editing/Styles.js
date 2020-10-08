import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor:theme.palette.primary.main,
        fontFamily:theme.typography.fontFamily,
        margin: theme.spacing(3, 0, 2),
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
          },
    },
    field:{
        marginBottom:"3%",
        fontWeight:600
        
    },
    cardRoot: {
        minWidth: 235,
        maxHeight:400,
        padding:'2%',
        overflowY:'scroll'
    },
    formContainer:{
      [theme.breakpoints.up('sm')]:{
        width:'60%', 
        float:'left',
      },
      [theme.breakpoints.down('sm')]:{
        width:'100%'
      },
      marginBottom:'3%',
    },
 
    listContainer:{
      [theme.breakpoints.up('sm')]:{
        width:'40%',
        float:'right',
      },
      padding:"5% 5% 5% 4%",
      [theme.breakpoints.down('sm')]:{
        width:'100%'
      }
    },
    title: {
      fontSize: 18,
      fontFamily: theme.typography.fontFamily,
      colot:"#000",
      fontWeight: 600,
      justifyContent:'center'
    },
    select:{
      width:'30%'
    },
    contributor:{
      width:'48%'
    },
    itemBtn:{
      marginTop:'2%',
      marginBottom:'2%'
    },
    input: {
      display: 'none',
    },
    cardContributors:{
      maxHeight:150,
      marginTop:'2%',
      overflowY:'scroll',
      width:'auto'
    },
    popUp:{
      [theme.breakpoints.down('md')]:{
        margin:'2%'
      },
      [theme.breakpoints.up('md')]:{
        display:'none'
      }
    },
    editBtn:{
      width:'20%',
      float:'right'
    },
    oneEntry:{
      width:'80%', 
      paddingTop:"2%"
    },
    listItem:{
      width:'100%', 
      display:'inline'
    },
    paperRoot:{
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: "90%"
      },
    },
   
}));
  
export { useStyles };