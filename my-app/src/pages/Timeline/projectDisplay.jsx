import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



export default function card() {
    return (
        <div>
          <CardActionArea href='/signin'>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {projejcdata.Title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Project Description
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
    )
}
