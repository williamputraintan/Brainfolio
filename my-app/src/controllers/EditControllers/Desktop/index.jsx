import React , {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { StoreContext } from '../../../context/store.context';
import Container from '@material-ui/core/Container';



import { useTrail, animated } from 'react-spring';
import { Route, Switch, withRouter, Redirect } from "react-router";
import Paper from '@material-ui/core/Paper';


import TypographyTitle from "../../../common/SectionTitle";

import Paths from "../../../utils/path";


import EditPageTabs from "../../../components/EditingTabs/TabWrapper";
import EditPageTab from "../../../components/EditingTabs/Tab";

import FormDataLayout from "../FormDataLayout";




const indexToTabName = {
  0: "contact",
  1: "education",
  2: "experience",
  3: "skills",
  4: "projects",
  5: "custom1",
  6: "custom2",
  7: "overview"
};

const tabNames = Object.values(indexToTabName);


const useStyles = makeStyles((theme) => ({
  container:{
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  
}));



function EditDesktop(props) {
  const { state } = useContext(StoreContext);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { history, location, match } = props;
  const { params } = match


  const handleChange = (event, newValue) => {
    setValue(newValue);
    const basePath = location.pathname.split("/").slice(0, -1).join("/");
    history.push(`${basePath}/${indexToTabName[newValue]}`);
  };

  return (
    <>
    <Redirect 
      from={`${Paths.EDIT_PORTFOLIO}/:username`} 
      to={params.username ? `${Paths.EDIT_PORTFOLIO}/${params.username}/contact` : Paths.SIGN_IN} />

    <Container maxWidth="lg">
      <Grid container direction="column" className={classes.container}>

      <TypographyTitle 
        title="Customize your profile!" 
        subtitle="Add more information to get more people to be interested in you."/>

        <EditPageTabs value={value} onChange={handleChange} aria-label="Editing Tabs">
          {
            tabNames.map((value,key) => {
              return(
                <EditPageTab key={key} label={value} />
              )
            })
          }
        </EditPageTabs>
        
        <FormDataLayout/>
      </Grid>
    </Container>
    </>
  )
}


function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 10, tension: 2000, friction: 400 },
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

export default withRouter(EditDesktop);
