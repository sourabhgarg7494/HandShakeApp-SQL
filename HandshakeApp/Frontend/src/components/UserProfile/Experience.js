import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Experience extends Component {
    constructor(){
        super();
        this.state = {  
            books : []
        }
    }  
    // componentDidMount(){
    //     axios.get('http://localhost:3001/')
    //             .then((response) => {
    //             //update the state with the response data
    //             this.setState({
    //                 books : this.state.books.concat(response.data) 
    //             });
    //         });
    // }

    render(){
        return(
            <div class="dataCard">
                <div class="itemsmain">
                    <h2 class="CardHeading">Work & Volunteer Experience</h2>
                </div>
            </div>
        )
    }
}

export default Experience;