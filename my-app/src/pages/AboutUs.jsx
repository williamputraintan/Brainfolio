import React ,{useState} from 'react';
import VerticalTabs from '../components/AboutUs/VerticalTabs.jsx';
import MemberCards from '../components/AboutUs/MemberCards.jsx';
import { Typography } from '@material-ui/core';
import { makeStyles ,createMuiTheme, ThemeProvider }from '@material-ui/core/styles';
import bgDesktopImage from '../images/aboutUs/missions/mission.png';
import bgMobileImage from  '../images/aboutUs/missions/mobile-mission.png';
import whitewave from '../images/aboutUs/missions/whitewave.png';
import theme from '../utils/theme/MinimalTheme';
import {useSpring,animated,useTrail} from 'react-spring'

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
        padding:'15% 5% 5% 5%',
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
        [theme.breakpoints.up('sm')]: {
            padding: '3% 7% 3% 7%',
        },
        [theme.breakpoints.down('xs')]: {
            padding:'4% 7% 4% 7%',
        },
    },
    content:{
        position:'absolute',
        left:'8%',
        textAlign:'left',
        color:'#FFFFFF',
        [theme.breakpoints.up('md')]: {
            top:'35%',
            width:'45%'
        },
        [theme.breakpoints.only('sm')]: {
            top:'35%',
            left:'5%',
            width:'53%'
        },
        [theme.breakpoints.down('xs')]: {
            top:'25%',
            width:'70%'        
        }
    },
    footer:{
        color:theme.palette.primary.color,
        height:'20vh',
        padding:'4% 8% 4% 8%',
        backgroundColor:'#E2ECF8',
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
            color:theme.palette.primary.main,
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

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`

export default function AboutUs(){
    const classes = useStyles();
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
    const [open, setopen] = useState(true)
    return(
        <ThemeProvider theme={aboutTheme}> 
            <div className={classes.aboutContainer}>
                <div className={classes.whatwedo} onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                    <animated.div className={classes.content} style={{ transform: props.xy.interpolate(trans1) }}>
                        <Trail open={open} >
                            <Typography variant="h1">
                                Our mission  
                            </Typography >
                            <Typography variant="h2">
                                We aim to help individuals to showcase their skills by building a platform where the user can present their experiences and projects to demonstrate their abilities.
                            </Typography>
                        </Trail>
                    </animated.div>  
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

function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 600 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

