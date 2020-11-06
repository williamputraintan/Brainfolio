import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from 'use-debounce';
import { useHistory } from "react-router-dom"


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';


const path="https://testdockerprod123.herokuapp.com/public/user/"

const useStyles = makeStyles((theme) => ({
  loader: {
    marginTop: "8px",
  },
  search: {
    width: 280,
    marginTop: "8px",
    display: "flex",
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
      height: 48
    },
    
  },
  searchInput: {
    [theme.breakpoints.down('xs')]: {
      width: "100%"
    },

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  result: {
    position: "absolute",
    marginTop: "42px",
    marginLeft: "42px",
    width: 240,
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1),
    cursor: "pointer",
    zIndex: 999,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      width: 320,
    },
  },
  root:{
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1
    },
  }
}));

const data = [{
  username: "dadasda",
  email:"dsadasdas"
},{
  username: "dadasda",
  email:"dsadasdas"
}]

function SearchBar() {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  const [debouncedSearch] = useDebounce(search, 500);
  const history = useHistory();


  React.useEffect(() => {
    const source = Axios.CancelToken.source();

    if(search.length > 0){
        setLoading(true)
        Axios.get(path + `?search=${search}`)
        .then(res => {
          if(res.data){
            setData(res.data)
            console.log(res.data)
          }
          setLoading(false)
        }).catch(err =>{
          setLoading(false)
            console.log(err)
        })

    }


    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    }
  }, [debouncedSearch])

  // const debounced = useDebouncedCallback(
  //   (value) => {
  //     setSearch(value)
  //   },400
  // );

  const classes = useStyles();
  console.log(loading)

  function navigateToProject(e, args){
    console.log(args)
    history.push("/app/portfolio/"+ args)
    setSearch("")
    setData([])
  }

  

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          className={classes.searchInput}
          value={search}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        { loading && <CircularProgress className={classes.loader} size={20}/>}
      </div>
     
      {
         (data.length > 0 ) && 
         <div className={classes.result}>
            <List dense>
              {
                  data.map((item,key) => {
                    return(
                      <>
                      <ListItem button onClick={e => navigateToProject(e,item.username)}>
                        <ListItemText
                          primary={item.username}
                          secondary={item.email}
                        />
                      </ListItem>
                      {(key !== data.length) && <Divider />}
                      </>
                    )
                  })
              }
            </List>
          </div>
      }    
     
    </div>
  )
}

export default SearchBar
