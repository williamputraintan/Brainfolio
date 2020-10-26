import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';



function ProjectAuthor(data) {
    const classes = useStyles();
    const author = data.ProjectAuthor;
    
    function authorArray(authors){
      let nameEmailAuthors = [];
      if (authors!==undefined){
        let author = authors.split(',');
        for (let i=0; i<(author.length)/2;i++){
          nameEmailAuthors.push(author.splice(0,2));
        }
      } else {
        nameEmailAuthors.push(["Personal Project", ""]);
      }
      return nameEmailAuthors;
    }
    const authorDetails = authorArray(author);
    console.log("ARRRRR"+authorArray(author));
    return (
        <Container className={classes.cardGrid} >
          <Grid container spacing={2}>
            {authorDetails.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={12}>
                <Card>
                    <CardHeader
                    avatar={
                      <CardActionArea>
                        <Avatar className={classes.avatar}>
                        </Avatar>
                      </CardActionArea>
                    }
                    title= {"Name: "+ "Andrew Tjen"}
                    subheader= {"Email: "+ "andrewt@gmail.com"}
                    />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}

export default ProjectAuthor