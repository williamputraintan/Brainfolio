import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function PeopleDisplay() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div>
            <Card className={classes.root} variant="outlined">


            <CardActionArea>
              <CardHeader
                  avatar={
                      <Avatar className={classes.avatar}/>
                  }
                  title="Rozak Yozali"
                  subheader="Software Engineer"
                  />

            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                
                Strong in design and integration problem-solving skills. Expert in Java, C#, .NET, and T-SQL with database analysis and design. Skilled in developing business plans, requirements specifications, user documentation, and architectural systems research. Strong written and verbal communications.

                </Typography>

            </CardContent>

            </CardActionArea>

            </Card>
        </div>
    )
}

export default PeopleDisplay





