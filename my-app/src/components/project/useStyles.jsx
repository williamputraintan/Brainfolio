import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bgcolor: {
    background: 'linear-gradient(180deg, #D7EFFF 10%, #FFFFFF 90%)'
  },
  back: {
    padding: theme.spacing(1, 0, 1),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  comment: {
    // width:'75%',
    maxWidth:'md',
    padding: theme.spacing(2,2,2)
    // backgroundColor: theme.palette.background.paper,

  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  like: {
    // backgroundColor: theme.palette.background.paper,
    float: "right",
    // padding: theme.spacing(2, 0, 2),
  },
  title: {
    padding: "2",
  },
  // Comment's
  paper: {
    padding: theme.spacing(2),
    margin: '1',
    maxWidth: 'md',
    // border: 1,
  },
  space: {
    padding: theme.spacing(2,2,0),
    maxWidth:'md',
  },
  post: {
    float: "right",
    padding: theme.spacing(1,0,1),
    backgroundColor: theme.palette.background.paper,

  },
}));

export default useStyles;