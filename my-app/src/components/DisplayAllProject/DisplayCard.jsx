import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../context/store.context';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {history} from '../../utils/BrowserHistory';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  cardRoot: {
    height: '300px',
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
    const {state} = useContext(StoreContext);
    const data = props.data;
    const username = state.user?.username

    const img = props.img
    function handleClick(){     
      history.push(`../../project/${username}/${data._id}`)
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