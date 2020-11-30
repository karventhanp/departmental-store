import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
export default class Logout extends Component {
    componentDidMount=()=>{
        localStorage.setItem('isLoggedin',false);
        const a=localStorage.getItem('isLoggedin');
        if(a==='false'){
            <Redirect  to='/login' />
        }

    }
    render() 
    
    {
        return (
            <div>
                
            </div>
        )
    }
}
