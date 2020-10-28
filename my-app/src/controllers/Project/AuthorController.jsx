import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

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
      backgroundColor: "#5584C2",
      color: "white",
      width:"100%",
      padding: theme.spacing(2,2,2,0)
    },
    authorCard: {
      padding: theme.spacing(0,0,2,0)

    }
    }));

    const classes = useStyles();

    // const [author] = props.data;
    // console.log("AUHTOR: "+author)
    const author = "Harry J, w@e.com, aoiw, ef@ef.com, feoie, OEI@oiefj.com,feoie, OEI@oiefj.com,feoie, OEI@oiefj.com";


    function authorArray(authors){
      let nameEmailAuthors = [];
      if (authors!==""){
        let author = authors.split(',');
        // console.log(author.length)
        // console.log(author)
        for (let i=0; i<((author.length)/2)+2;i++){
          nameEmailAuthors.push([author.splice(0,2)]);
          // console.log(i)
          // console.log("Len mname "+nameEmailAuthors.length)
        }
      } else {
        nameEmailAuthors.push(["Personal Project", ""]);
      }
      return nameEmailAuthors;
    }
    const authorDetails = authorArray(author);
    return (
        <Container className={classes.cardGrid} >
          <Grid className={classes.author}>
            <Typography variant="h6">
              Author
            </Typography>
          </Grid>
          <Grid container className={classes.authorCard} spacing={2}>
            {authorDetails.map((author) => (
              <Grid item key={author} xs={12} sm={6} md={12}>
                <Card>
                    <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}/>
                    }
                    title= {""+author[0]}
                    subheader= {""+author[1]}
                    />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}

export default AuthorController