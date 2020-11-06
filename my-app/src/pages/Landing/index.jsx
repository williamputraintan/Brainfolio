import React, {useRef} from 'react';
import { makeStyles }from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Hero from "./Hero";
import Steps from "./Steps";
import Logo from "../../Assets/SVG/Logo.jsx";
import { motion, useViewportScroll } from "framer-motion";

import Team from "./Team";


const useStyles = makeStyles((theme) => ({
  brand:{
    position: "fixed",
    top: theme.spacing(2),
    left: theme.spacing(4)
  },
  copyright: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(4),
    fontWeight: 700,
    fontSize: "0.875rem"
  },
  test:{
    width: 100,
    height: 100,
    background: "#CCC",
    position: "fixed",
    top: 200
  }
}));

function LandingPage() {
  const classes = useStyles();
  const ref = useRef()
  const { scrollYProgress } = useViewportScroll(ref);
  React.useEffect(() => {
  },[])

  return (
    <main className={classes.root} ref={ref}>
      <Typography color="primary" component="span" className={classes.copyright}>
        {`Copyright © Brainfolio ${new Date().getFullYear()}.`}
      </Typography>
      <Logo className={classes.brand} width={32} height={32}/>
      <Hero scrollY={scrollYProgress}/>
      <Steps />
      <Team />
      {/* <motion.div className={classes.test} style={{ scaleY: scrollYProgress  }} /> */}
    </main>
  )
}

export default LandingPage
