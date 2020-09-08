import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';

const author = [1,2,3]
function ProjectAuthor() {
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} maxWidth="md">

          <Grid container spacing={2}>
            {author.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                  <CardActionArea>
                    <Card>
                        <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                            </Avatar>
                        }
                        title="Name | Author"
                        subheader="Email: author@email.com"
                        />
                    </Card>
                  </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}

export default ProjectAuthor