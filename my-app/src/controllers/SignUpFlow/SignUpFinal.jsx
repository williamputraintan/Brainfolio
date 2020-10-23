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
    borderRadius: "50%",
    height: 48,
    width: 48,
    backgroundColor: "#EDEDED"
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
      console.log(avatarEl.current.style)
      avatarEl.current.style.backgroundImage = URL.createObjectURL(e.target.files[0]);
      avatarEl.current.onload = function(){
        URL.revokeObjectURL(avatarEl.style.backgroundImage)
      }
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
                alt="Profile"
                className={classes.image}>
                 {/* { fields.avatar && <img ref={avatarEl}}  */}
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
      

      <Button
        type="submit"
        fullWidth
        color="primary"
        className={classes.skip}
      >
      Skip
    </Button>

    </div>
  )
}

export default SignUpFinal
