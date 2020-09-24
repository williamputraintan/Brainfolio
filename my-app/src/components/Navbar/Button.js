import React from 'react'
import './Button.css'
import {Link} from 'react-router-dom';

export function Button(){
    return(
        
        
        <div>
            
            <Link to='signUp'>
                <button class='btn'>
                    Sign Up
                </button>
            </Link>
            <Link to='signIn'>
            <button class='btn'>
                Sign In
            </button>
            </Link>
        </div>
    )
}