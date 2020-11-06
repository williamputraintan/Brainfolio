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
    history.push(`${Paths.EDIT_PORTFOLIO}/${state.user.username}/${indexToTabName[newValue]}`);
  };

  return (
    <>
    {/* <Redirect 
      from={`${Paths.EDIT_PORTFOLIO}/:username`} 
      to={params.username ? `${Paths.EDIT_PORTFOLIO}/${params.username}/contact` : Paths.SIGN_IN} /> */}

    {}

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

export default withRouter(EditDesktop);
