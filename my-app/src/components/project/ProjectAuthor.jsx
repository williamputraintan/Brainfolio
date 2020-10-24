import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';

const author = [
                {},{},{}
              ]

function ProjectAuthor() {
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} >
          <Grid container spacing={2}>
            {author.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={12}>
                <Card>
                    <CardHeader
                    avatar={
                      <CardActionArea>
                        <Avatar className={classes.avatar}>
                        </Avatar>
                      </CardActionArea>
                    }
                    title= {"Name | Author"}
                    subheader="Email: author@email.com"
                    />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}

export default ProjectAuthor