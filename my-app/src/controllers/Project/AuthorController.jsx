import React, {useRef} from 'react'
import Card from '@material-ui/core/Card';
// import CardAccent from "../../common/CardAccent";
import CardActionArea from '@material-ui/core/CardActionArea';
import { useSpring, animated } from 'react-spring'


import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles ,createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';




function AuthorController(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        minHeight: "100vh",
      }
    },
    author:{
      // backgroundColor: theme.palette.bacgroundAccent,
      color: theme.palette.text.primary,
      width:"100%",
      padding: theme.spacing(0,0,2)
    },
    authorCard: {
      padding: theme.spacing(0,0,0),
      // backgroundColor: theme.palette.titleBgAccent,
      backgroundColor: theme.palette.cardAccent,
    },
    outline: {
      // margin: theme.spacing(0,2,0),
      backgroundColor: theme.palette.bacgroundAccent,
      border: "3px",
      width: "100%",
      padding: theme.spacing(2)
    }
    }));

    const classes = useStyles();
    const data = props.data;
    // const [author] = props.data;

    return (
      <>
      { data.length?
        (<Grid className={classes.outline}>
          <Container >
            <Grid className={classes.author}>
              <Typography variant="h4">
                Author
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {data.map((author) => (
                <Grid item key={author} xs={12} sm={6} md={4} lg={3}>
                  <CardActionArea
                    href={`mailto:${author.email}`}
                    >
                    <Card className={classes.authorCard}>
                        <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}/>
                        }
                        title= {author.name}
                        subheader= {author.email}
                        />
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>):
        <></>}
      </>
    )
}

export default AuthorController