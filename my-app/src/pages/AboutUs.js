import React from 'react';

import VerticalTabs from '../components/VerticalTabs.js';
import MemberCards from '../components/MemberCards.js';
import './aboutUs.css';


export default function AboutUs(){

    return(
       
        <div className='about-container'>
            <div className='whatwedo'>
                <h1>What we do.</h1>
                <h2>Explain what the web app does here.</h2>
            </div>
            <div className='instructions'>
                <h2 style={{paddingBottom:'2%', fontSize:'40px'}}>User Guide</h2>
                <VerticalTabs/>
            </div>
            <div className='meettheteam'>
                <h2 style={{paddingBottom:'2%', fontSize:'40px'}}>Meet the team.</h2>
                <MemberCards/>
            </div>
            
        </div>
         
    );
}





