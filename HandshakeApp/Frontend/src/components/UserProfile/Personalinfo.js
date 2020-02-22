import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Personalinfo extends Component {
    constructor(props){
        super(props);
        this.state = {  
        }
    }

    render(){
        return(
            <div className="dataCard">
                <div className="itemsmain">
                    <h2 className="CardHeading">Personal Information</h2>
                    <p>{this.props.emailId}</p>
                    <p>{this.props.gender}</p>
                </div>
            </div>
        )
    }
}

export default Personalinfo;