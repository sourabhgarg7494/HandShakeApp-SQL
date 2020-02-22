import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Skills extends Component {
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
            <div className="dataCard">
                <div className="itemsmain">
                    <h2 className="CardHeading">Skills</h2>
                </div>
            </div>
        )
    }
}

export default Skills;