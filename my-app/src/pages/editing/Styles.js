import { makeStyles } from '@material-ui/core/styles';

//styles for editing page main components
const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    field:{
      marginBottom:"3%",
      fontWeight:600
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
      width:'auto'
    },
    cardContributors:{
      maxHeight:150,
      marginTop:'2%',
      overflowY:'scroll',
      width:'auto'
    }
}));
  
export { useStyles };