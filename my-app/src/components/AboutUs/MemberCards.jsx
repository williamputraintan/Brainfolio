import React ,{useState,useRef} from 'react';
import { MuiThemeProvider,makeStyles,createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import avatar from '../../images/aboutUs/avatar.png';
import theme from '../../utils/theme/MinimalTheme';

import { useSpring, animated } from 'react-spring'

const cardTheme = createMuiTheme({
  ...theme,
    overrides: {
      MuiCardActions: {
        root: {
            justifyContent:"center",
          }
        },   
      },
      MuiButton:{
        textPrimary:{
          color:'#ffffff',
        }
      }
});
  
  const cardStyles = makeStyles((theme) => ({
    cardsContainer:{
      display: 'flex',
      flexWrap: 'wrap'      
    },
    readMore:{
      bottom:'3%', 
      position: 'absolute'
    },
    root: {
      flex: '1 1 auto',
      padding: '10px',
      width: 300,
      minHeight: 450,
      // backgroundColor:theme.palette.secondary.main,
      margin:"2%",
      color:'black'
    },
    media: {
      height: '250px',
      // backgroundColor:'#ffffff'
    },
    name: {
      fontFamily: theme.typography.fontFamily,
      fontSize:'20px',
      fontWeight:"bold",
      alignItems:"center",
      height:"60px",
      paddingTop:'5%'
    },
    memDesc: {
      fontFamily: theme.typography.alternative,
      fontSize:'13px',
      fontWeight:'450',
      padding: '0px 8px 0px',
      justify:"center"
  
    }
    ,cardTest:{
      height:'200px',
      width:'100px',
      margin:'5%',
      display:'inline-block'
    },
    back :{
      backgroundImage: `url(${avatar})`
    },
    front: {
      backgroundImage: `url(${avatar})`
    }
  }));

export default function MemberCards() {
  const [flipped, setFlip] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  const cardList=[
    {name:'Andrew Tjen', descriptionFront:"Insert Desc Here",descriptionBack:"Insert More details here"},
    {name:'Franklin Aldo ', descriptionFront:"Insert Desc Here",descriptionBack:"Insert More details here"},
    {name:'Hanson Lynn', descriptionFront:"Insert Desc Here",descriptionBack:"Insert More details here"},
    {name:'Patricia Budiman', descriptionFront:"Insert Desc Here",descriptionBack:"Insert More details here"},
    {name:'William Intan', descriptionFront:"Insert Desc Here",descriptionBack:"Insert More details here"}
  ]
    const classes = cardStyles();
  
    return (
      
        <div>
           <MuiThemeProvider theme={cardTheme}>
             <div className={classes.cardsContainer}>
               {cardList.map((card, i) => (
                <div style={{margin:'4%'}}>  
                  <CardAnimation>
                      <FlipCard nameFront={card.name} image={avatar} descFront={card.descriptionFront} nameBack={card.name} descBack={card.descriptionBack}/>
                  </CardAnimation>
                   
                </div>
              ))}
            </div>
          </MuiThemeProvider>
        </div>
    );
  }
  
  //adapted from https://usehooks.com/useSpring/ & https://www.react-spring.io/docs/hooks/examples

  function CardAnimation({children}) {
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    // We add this ref to card element and use in onMouseMove event to get element's offset and dimensions.
    const ref = useRef();
    
    // The useSpring hook
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  
    return (
      <animated.div
        ref={ref}
        onMouseMove={({ clientX, clientY }) => { 
          const x =
            clientX -
            (ref.current.offsetLeft -
              (window.scrollX || window.pageXOffset || document.body.scrollLeft));
          // Get mouse y position within card
          const y =
            clientY -
            (ref.current.offsetTop -
              (window.scrollY || window.pageYOffset || document.body.scrollTop));
            // Set animated values based on mouse position and card dimensions
          const dampen = 30; // Lower the number the less rotation
          const xys = [
            -(y - ref.current.clientHeight / 2) / dampen, // rotateX
            (x - ref.current.clientWidth / 2) / dampen, // rotateY
            1.1 // Scale
          ];
          set({ xys: xys })}}
        
        onMouseLeave={() => {
          set({ xys: [0, 0, 1] });
        }}

        style={{ transform: props.xys.interpolate(trans) }}
      >
        {children}
      </animated.div>
    );
  } 
  
  function FlipCard(props) {
    const nameFront=props.nameFront;
    const descFront=props.descFront;
    const image=props.image;
    const nameBack=props.nameBack;
    const descBack=props.descBack;

      const [flipped, set] = useState(false)
      const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
      })
      return (
        <div onClick={() => set(state => !state)}>
          {!flipped?<animated.div style={{ opacity: opacity.interpolate(o => 1 - o), transform }} ><CardFront name={nameFront} image={image} desc={descFront}/></animated.div>:null}
          {flipped? <animated.div style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }} ><CardBack name={nameBack} desc={descBack}/></animated.div>:null}
        </div>
      )
    }
    

    function CardBack(props){
      const name = props.name;
      const desc = props.desc;
      const classes=cardStyles();
      return (
        <Card className={classes.root}>
        
            <div className={classes.name}>
                {name}
            </div>
            <div className={classes.memDesc}>
              {desc}
            </div>
      
          <CardActions className={classes.readMore}>
            <Button size="small" color="primary">
              Back
            </Button>
          </CardActions>
        </Card>
      )
  
    }
    function CardFront(props){
      const name=props.name;
      const image=props.image;
      const desc=props.desc;

      const classes=cardStyles();
      return (
        <Card className={classes.root}>
          <CardMedia
              className={classes.media}
              image={image}
              title={name}
          />
      
            <div className={classes.name}>
                {name}
            </div>
            <div className={classes.memDesc}>
              {desc}
            </div>
      
          <CardActions className={classes.readMore}>
            <Button size="small" color="primary" >
              Read More
              
            </Button>
            
          </CardActions>
        </Card>
      )
    }
  