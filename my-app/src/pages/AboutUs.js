import React from 'react';
import VerticalTabs from '../components/AboutUs/VerticalTabs.js';
import MemberCards from '../components/AboutUs/MemberCards.js';
import './aboutUs.css';

export default function AboutUs(){

    return(
       
        <div className='about-container'>
            <div className='whatwedo'>
                <div className='content'>
                <h1>Our mission</h1>
                <h3>We aim to help individuals to showcase their skills by building a platform where the user can present their experiences and projects to demonstrate their abilities.</h3>
                </div>
            </div>
            <div className='instructions'>
                <h2 style={{paddingBottom:'2%', fontSize:'40px'}}>User Guide</h2>
                <VerticalTabs/>
            </div>
            <div className='meettheteam'>
                <h2 style={{paddingBottom:'2%', fontSize:'40px'}}>Meet the team</h2>
                <MemberCards/>
            </div>
        </div>
         
    );
}





