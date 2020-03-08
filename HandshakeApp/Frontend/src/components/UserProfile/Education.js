import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditEnabled: false
            , isValueUpdated: false
            , schoolName: null
            , startDate: null
            , endDate: null
            , major: null
            , cumulativeGPA: null
            , type : "UpdateEducationData"
        }

        this.editClick = this.editClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.schoolNameChangeHandler = this.schoolNameChangeHandler.bind(this);
        this.majorChange = this.majorChange.bind(this);
        
    }

    schoolNameChangeHandler (e){
        this.setState({
            schoolName : e.target.value
        })
    }

    majorChange (e){
        this.setState({
            major : e.target.value
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
        })
    }

    saveClick(e) {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        var data = {
            userId: this.props.email
            ,type : this.state.type
            ,schoolName : this.state.schoolName
            ,major : this.state.major
            ,token : cookie.load('cookie')
        }
        axios.post('http://localhost:3001/profile',data)
                .then((response) => {
                //update the state with the response data

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

    render() {
        var editButton = null;
        if(!this.props.isReadOnly){
            editButton = (<button type="button" className="cancelButton" onClick={this.editClick} >
                            <span>Edit</span>
                        </button>)
        }
        var eduData;
        if (!this.state.isEditEnabled) {
            eduData = (<div className="row">
                            <div className="col-md-10">
                            <label>{this.props.schoolName}</label>
                            <p></p>
                            <label>{this.props.startDate} - {this.props.endDate}</label>
                            <p></p>
                            <label>Major in {this.props.major}</label>
                            <p></p>
                            <label>Cumulative GPA : {this.props.cumulativeGPA}</label>
                            <span> <svg className="svgGPA icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                </path>
                                </svg>
                            </span>
                            </div>
                            <div className="col-md-2">
                                {editButton}
                            </div>
                        </div>);
        }else if(this.state.isValueUpdated) {
            eduData = (<div className="row">
                            <div className="col-md-10">
                            <label>{this.state.schoolName}</label>
                            <p></p>
                            <label>{this.props.startDate} - {this.props.endDate}</label>
                            <p></p>
                            <label>Major in {this.state.major}</label>
                            <p></p>
                            <label>Cumulative GPA : {this.props.cumulativeGPA}</label>
                            <span> <svg className="svgGPA icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                </path>
                                </svg>
                            </span>
                            </div>
                            <div className="col-md-2">
                            {editButton}
                            </div>
                        </div>);
        }else {
            eduData = (<div className="row">
                            <div className="col-md-10">
                                <label>School Name</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.schoolNameChangeHandler} className="form-control" placeholder="School Name" defaultValue={this.props.schoolName} />
                                </div>
                                <label>Start Date</label>
                                    <div className="form-group">
                                    <input type="text" disabled  className="form-control" placeholder="School Name" defaultValue={this.props.startDate} />
                                </div>
                                <label>End Date</label>
                                    <div className="form-group">
                                    <input type="text" disabled  className="form-control" placeholder="Month Year" defaultValue={this.props.endDate} />
                                </div>
                                <label>Major</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.MajorChange} className="form-control" placeholder="Major" defaultValue={this.props.major} />
                                </div>
                                <label>Cumulative GPA</label>
                                    <div className="form-group">
                                    <input type="text" disabled className="form-control" placeholder="Cumulative GPA" defaultValue={this.props.cumulativeGPA} />
                                </div>
                            </div>
                            <div className="col-md-2">
                            <button type="button" className="saveButton" onClick={this.saveClick}>
                                <span>Save</span>
                            </button>
                            <button type="button" className="cancelButton" onClick={this.cancelClick}>
                                <span>Cancel</span>
                            </button>
                            </div>
                        </div>);
        }


        return (
            <div className="EducationCard">
                <div className="itemsmain">
                    <h2 className="CardHeading">Education</h2>
                    <label></label>
                    {eduData}

                </div>
            </div>
        )
    }
}

export default Education;