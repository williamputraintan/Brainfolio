import React, {useState, useContext}from 'react';
import { useEffect} from 'react-dom';
import AxiosInstance  from "../../utils/axios";
import { UserContext } from '../../context/user.context';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';
import theme from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import bgDefaultDark from '../../images/portfolio-jumbotron/grey-diamond.jpg';
import bgDefaultLight from '../../images/portfolio-jumbotron/blue-diamond-bg.png'
import profileImage from '../../images/portfolio-profilepic/arthursetiawan.jpg';
import Paper from '@material-ui/core/Paper'
import './new-pf.css'

import PF_Timeline from './portfolio-timeline';
import PF_Body from './portfolio-body';

const useStyles = makeStyles(() => ({
    pf_container:{
        width:"100%",
        backgroundImage: `url(${bgDefaultLight})`,
    },
    large: {
        width: "180px",
        height: "180px",
        // alignItems: "center"
    },
    profilePicRoot: {
        alignItems: "center", 
        justifyItems: "center",
    },
    lightButton:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
        },
    },
    darkButton:{
        backgroundColor:"#353535",
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: "#CDCDCD",
            color: '#4C516D'
        },
    },

    // paper: {
    //     textAlign: 'center',
    //     color: theme.palette.text.paper,
    // },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        // backgroundColor: "white"
      }
    
  })); 

export default function New(){

    // const [portfolio, setPortfolio] = useState(Object);
    const {state} = useContext(UserContext);
    // const [profile,setProfile] = useState([]);
    
    // console.log(portfolio);
    // image from website
    
    const [pf, setPf] = React.useState([]);
    let flag = true;
    let loc = window.location.pathname;

    function getUsername(path) {
        const res = path.split("/");
        return res[2];
    }
    
    function getPrivacyLevel(path) {
        const res = path.split("/");
        return res[0];
    }

    function showEditButton(path) {
        // if (getPrivacyLevel(path)==="Public"){
            if (true){
        } else {
        return (<IconButton 
            color="default"
            className={darkmode ? classes.darkButton : classes.lightButton} 
            href="../edit/contact"
        >
            <EditIcon/>
        </IconButton>
        )
    }};
    if (flag){
        AxiosInstance.get("public/profile/"+getUsername(loc))
        .then(res => {
        setPf(res.data);
        })
        flag = false;
    }
    const darkmode = false;

    let headerImg = bgDefaultLight;
    if (darkmode) {
        headerImg = bgDefaultDark;
    }
    const img = profileImage;
    // const img = (pf.profileImageName)[0];
    
    // const headerImg = (pf.backgroundImageName)[0]
    const Header = {
        backgroundImage: 'url('+ headerImg+')'
        }
    const classes = useStyles();

    return(
        <div>
            <Paper style={Header} >
            
                <div class="grid-container">
                    <div class='left'>
                    </div>
                    <div class="picture">
                        <Avatar src={img} className = {classes.large} />
                    </div>

                    <div class="right">
                    </div>

                    <div class="profile">
                        <Typography variant="h3"> <b> {pf.fullName} </b></Typography>
                        <Typography variant="h5"> <b> {pf.title} </b></Typography>
                        <br/>
                        <Typography> Location: {pf.address} </Typography>
                        <Typography> email: {pf.email} </Typography>
                        <Typography> Ph.: {pf.phone} </Typography>
                        <Typography> Links: <a href={pf.relevantLink}>{pf.relevantLink}</a> </Typography>
                        <Typography> LinkedIn: <a href={pf.linkedIn}>{pf.linkedIn}</a> </Typography>

                    </div>

                    <div class="edit">
                        {showEditButton(loc)}
                    </div>
                    {/* <div class='right'></div> */}
                </div>
                
            </Paper>
            <div class='grid-body'>
                <PF_Timeline/>
                <PF_Body darkMode={darkmode}/>
            </div>   
        </div>
    );
}

// for authenticated route
// const config = {
    //     headers: { Authorization: `Bearer ${state.token}` }
    //   };

    // useEffect(() => {
    //     AxiosInstance.get("edit/portfolio/"+state.user.username,config)
    //         .then(res => {
    //             setPortfolio(res.data);
    //         })
    //     console.log(portfolio);
    // });

    // useEffect(() => {
    //     AxiosInstance.get("public/profile/username")
    //     .then(res => {
    //         console.log(res);
    //         // setPortfolio(res.data);
    //     })  
    // });