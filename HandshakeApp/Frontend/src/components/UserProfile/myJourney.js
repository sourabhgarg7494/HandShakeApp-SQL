import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { serverUrl } from "../../config";

class MyJourney extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditEnabled : false
            ,myJourney : null
            ,isValueUpdated : false
            ,type : "MyJourneyUpdate"
           
        }

        this.editClick = this.editClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.myJourneyChange = this.myJourneyChange.bind(this);
    } 

    myJourneyChange(e){
        e.preventDefault();
        this.setState({
            myJourney : e.target.value
        })
    }


    editClick(e) {
        e.preventDefault();
        this.setState({
            isEditEnabled : true
        })
    }

    cancelClick(e) {
        e.preventDefault();
        this.setState({
            isEditEnabled : false
            ,isValueUpdated : false
        })
    }

    saveClick(e) {
        e.preventDefault();
        debugger;
        axios.defaults.withCredentials = true;
        var data = {
            userId: this.props.email
            ,token : cookie.load('cookie')
            ,type : this.state.type
            ,myJourney : this.state.myJourney
        }
        axios.post(serverUrl+'profile',data)
                .then((response) => {
                //update the state with the response data
                debugger;
                console.log(response);
                if(response.status === 200){
                    this.setState({
                        isEditEnabled : false
                        ,isValueUpdated : true
                    });   
                }else{
                    this.setState({
                        isEditEnabled : false
                        ,isValueUpdated : false
                    });
                }
            });
    }

    render(){
        var editButton = null;
        if(!this.props.isReadOnly){
            editButton = (<button type="button" className="cancelButton" onClick={this.editClick} >
                            <span>Edit</span>
                        </button>)
        }

        var objective;
        if(this.state.isEditEnabled){
            objective = (<div className="row"><div className="col-md-10">
                <div className="form-group">
                    <textarea onChange={this.myJourneyChange} className="form-control" placeholder="My Journey" defaultValue={this.props.myJourney} />
                </div>
            </div><div className="col-md-2">
                    <button type="button" className="saveButton" onClick={this.saveClick}>
                        <span>Save</span>
                    </button>
                    <button type="button" className="cancelButton" onClick={this.cancelClick}>
                        <span>Cancel</span>
                    </button>
                </div></div>)

        }else if(this.state.isValueUpdated){
            objective = (<div className="row">
                    <div className="col-md-10">
                        <div className="form-group">
                            <textarea disabled className="form-control" placeholder="My Journey" defaultValue={this.state.myJourney} />
                        </div>
                    </div>
                    <div className="col-md-2"> 
                        <div className ="form-group">
                            {editButton}
                        </div>
                    </div>
                    </div>)

        }else{
            objective = (<div className="row">
            <div className="col-md-10">
                <div className="form-group">
                    <textarea disabled className="form-control" placeholder="My Journey" defaultValue={this.props.myJourney} />
                </div>
            </div>
            <div className="col-md-2"> 
                <div className ="form-group">
                    {editButton}
                </div>
            </div>
            </div>)

        }
        return(
            <div className="dataCard">
                <div className="itemsmain">
                    <div className="cardheadingdiv">
                        <h2 className="CardHeading">My Journey</h2>
                    </div>
                    <label className="helptextlabel">
                        <div className="helpText">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</div>
                    </label>
                    {objective}
                </div>
            </div>
        )
    }
}

export default MyJourney;