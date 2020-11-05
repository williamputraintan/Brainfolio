import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../context/user.context';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {history} from '../../utils/BrowserHistory';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  cardRoot: {
    height: '250px',
    padding:0,
  },
  media: {
    height: 140,
  },
  content:{
    backgroundColor:'white'
  }
});

export default function CardProject(props) {
    const classes = useStyles();
    const {state} = useContext(UserContext);
    const data = props.data;
    const username = state.user?.username
    const link = "https://brainfolio.herokuapp.com/project/" + data._id

    const img = 'https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg';
    
    function handleClick(){     
      history.push(`project/${username}/${data._id}`)
    }

    return (
      
      <Card className={classes.cardRoot}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={img}
            title={data.title}
          />
          <CardContent className={classes.content} >
            <Typography noWrap gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography noWrap variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}
