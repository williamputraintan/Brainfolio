import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import BackgroundFiller from "../../images/backgroundFiller.jpeg"
import { uploadProfileImages } from "../../utils/http"
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Paths from "../../utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "column"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    maxWidth: 400
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2c60a6",
  },
  title:{
    fontWeight: 700,
    fontSize: "2.125rem"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card:{
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2)
    
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  profileLabel:{
    marginTop: theme.spacing(3),
    fontSize: "1rem",
    marginLeft: theme.spacing(1) 
  },
  backgroundLabel:{
    marginTop: theme.spacing(3),
    fontSize: "1rem",
    marginLeft: theme.spacing(1) 
  },
  backgroundImg: {
    width: 200,
    height: 150,
    backgroundColor: "#EDEDED"
  },
  image:{
    height: 48,
    width: 48,
    backgroundColor: "#EDEDED",
    boxShadow: " 8px 8px 20px #f7f7f7,-8px -8px 20px #fff 8px 8px 35px #fafafa, -8px -8px 35px #fffffffff",
    borderRadius: "50%",
    border: "1px solid #EDEDEDAA",
    "& > img": {
      borderRadius: "50%",
      width: "100%",
      height: "100%",
      display:"none",

    }
  },
  skip:{
    maxWidth: 400
  },
  altTitle:{
    textAlign: "center"
  },
  uploadAction:{
    justifyContent: "center"
  }
}));

function SignUpFinal(props) {

  const backgroundEl = useRef();
  const avatarEl = useRef();


  const classes = useStyles();
  const [fields, setFields] = React.useState({
    background:null,
    avatar: null
  })

  function onSubmitForm(e){
    e.preventDefault();

    if(fields.background === "" || fields.avatar === ""){
      return;
    }
    console.log(fields)
    const formData = new FormData();
    formData.append("avatar", fields.avatar);
    formData.append("background", fields.background);
    
    uploadProfileImages(formData);
  }

  function onAvatarUpload(e){
    e.preventDefault();
    setFields({
      ...fields,
      avatar: e.target.files[0]
    })
    if(avatarEl){

      console.log(avatarEl.current.src)
      avatarEl.current.style.display = "block";
      console.log(URL.createObjectURL(e.target.files[0]))
      avatarEl.current.src = URL.createObjectURL(e.target.files[0]);
      // avatarEl.current.onload = function(){
      //   URL.revokeObjectURL(avatarEl.src)
      // }
    }
  }

  
  const onBackgroundUpload = (e) => {
    e.preventDefault();
  
    backgroundEl.current.src = URL.createObjectURL(e.target.files[0]);

    backgroundEl.current.onload = function(){
      URL.revokeObjectURL(avatarEl.src)
    }

    setFields({
      ...fields,
      background: e.target.files[0]
    })
    
  }


  return (
    <div className={classes.root}>
    <Typography variant="h4" className={classes.title} gutterBottom>
      Last step: Add profile picture
    </Typography>
     <form 
        className={classes.form} 
        onSubmit={onSubmitForm} 
        noValidate>

        <Typography className={classes.profileLabel} component="h5" variant="caption" display="block" gutterBottom>
          Profile Image
        </Typography>

        <Card className={classes.card}>
          <div className={classes.avatar}>
            {/* <img 
              alt="avatar"
              className={classes.image}
              ref={avatarEl}/> */}

              <div 
                className={classes.image}>
                 <img ref={avatarEl} alt="avatar"/>
              </div>
          </div>  
            <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                name="file"
                onChange={onAvatarUpload}
              />
              <label htmlFor="raised-button-file">
                <Button component="span" color="primary" variant="contained" className={classes.uploadBtn}>
                  Upload File
                </Button>
              </label>      
            </>
          </Card>


        <Typography className={classes.backgroundLabel} component="h5" variant="caption" display="block" gutterBottom>
          Background Image
        </Typography>

        <Card>
          <CardMedia
            ref={backgroundEl}
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={BackgroundFiller}
            title="Contemplative Reptile"
          />
          <CardActions className={classes.uploadAction}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-background"
                multiple
                type="file"
                name="file"
                onChange={onBackgroundUpload}
              />
              <label htmlFor="raised-button-background">
                <Button component="span" color="primary" className={classes.uploadBtn}>
                  Upload File
                </Button>
              </label>   
          </CardActions>
        </Card>

      
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Confirm
        </Button>
      </form>

      <Typography className={classes.altTitle} component="h6" variant="caption" display="block" gutterBottom>
          or
      </Typography>
      
      <Link component={RouterLink} to={Paths.HOME} variant="body2">
        <Button
        type="submit"
        fullWidth
        color="primary"
        className={classes.skip}
          >
          Skip
        </Button>
      </Link>

    

    </div>
  )
}

export default SignUpFinal
