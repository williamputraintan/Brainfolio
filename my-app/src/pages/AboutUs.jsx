import React from 'react';
import VerticalTabs from '../components/AboutUs/VerticalTabs.jsx';
import MemberCards from '../components/AboutUs/MemberCards.jsx';
import { Typography } from '@material-ui/core';
import { makeStyles ,createMuiTheme, ThemeProvider }from '@material-ui/core/styles';
import bgDesktopImage from '../images/aboutUs/missions/mission.png';
import bgMobileImage from  '../images/aboutUs/missions/mobile-mission.png';
import whitewave from '../images/aboutUs/missions/whitewave.png';
import theme from '../utils/theme/MinimalTheme';
//styles for editing page main components
const useStyles = makeStyles((theme) => ({
    aboutContainer:{
        width: '100%',
        margin:0,
        paddingRight:0,
        paddingLeft: 0,
    },
    theTeam:{
        backgroundColor:'#FFFFFF',
        padding:'5%',
        textAlign:'center',
        backgroundColor:'#E2ECF8',
        backgroundImage: `url(${whitewave})`,
        backgroundRepeat:'no-repeat'
    },
    whatwedo:{
        height: '100vh',
        backgroundPosition:'center center',
        backgroundSize:'cover',
        [theme.breakpoints.up('sm')]: {
            backgroundImage: `url(${bgDesktopImage})`,
            
        },
        [theme.breakpoints.down('xs')]: {
            backgroundImage: `url(${bgMobileImage})`, 
        }

    },
    instructions:{
        backgroundColor: '#FFFFFF',
        width:'100%',
        textAlign:'center',
        overflow:'hidden',
        h2:{
            paddingBottom:'2%', 
            fontSize:'40px'
        },
        [theme.breakpoints.up('sm')]: {
            padding: '3% 7% 3% 7%',
        },
        [theme.breakpoints.down('xs')]: {
            padding:'4% 7% 4% 7%',

        },
        
    },
    content:{
        position:'absolute',
        left:'10%',
        textAlign:'left',
        color:'#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            top:'35%',
            width:'45%'
        },
        [theme.breakpoints.down('xs')]: {
            top:'25%',
            width:'70%'        
        }
    },
    footer:{
        height:'20vh',
        padding:'4% 8% 4% 8%',
        backgroundColor:'#E2ECF8',
        color:theme.palette.primary.main,
        fontSize:'2vh',
        fontWeight:700,
        textAlign:'right'
    }
}));
const aboutTheme = createMuiTheme({
    ...theme,
    typography: {
        color: '#FFFFFF',
        h1: {
            marginBottom:'3%',
            fontWeight:500,
            [theme.breakpoints.up('sm')]:{
                fontSize:'8vh'
            },
            [theme.breakpoints.down('xs')]:{
                fontSize:'5vh'
            }
        },   
        h2:{
            [theme.breakpoints.up('sm')]:{
                fontSize:'3vh'
            },
            [theme.breakpoints.down('xs')]:{
                fontSize:20
            }
        },
        h3:{
            marginBottom:'5%',
            fontWeight:500,
            [theme.breakpoints.up('sm')]:{
                fontSize:'6vh'
            },
            [theme.breakpoints.down('xs')]:{
                fontSize:30
            }

        }
    
    },
});
 
export default function AboutUs(){
    const classes = useStyles();

    
    return(
        <ThemeProvider theme={aboutTheme}>
       
        <div className={classes.aboutContainer}>
            <div className={classes.whatwedo}>
                <div className={classes.content}>
                <Typography variant="h1">Our mission</Typography>
                <Typography variant="h2">We aim to help individuals to showcase their skills by building a platform where the user can present their experiences and projects to demonstrate their abilities.</Typography>
                </div>
            </div>
            <div className={classes.instructions}>
                <Typography variant="h3">User Guide</Typography>
                <VerticalTabs/>
            </div>
           
            <div className={classes.theTeam}>
                <div style={{width:'100%',height:'20%'}}><Typography variant="h3">Meet The Team</Typography></div>
                <MemberCards/>
            </div>
            <div className={classes.footer}>
              Brainfolio 2020
            </div>
        </div>
        </ThemeProvider>
         
    );
}





