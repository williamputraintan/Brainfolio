import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';



const projectDisplay = project => {


    return (
        <React.Fragment>
          <Grid item xs={12}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.projectDetails.Title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {project.projectDetails.Description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </React.Fragment>
    )
}

export default projectDisplay
