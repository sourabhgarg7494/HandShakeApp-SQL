import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {serverUrl} from '../../config'

class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditEnabled: false
            , isValueUpdated: false
            , schoolName: this.props.schoolName?this.props.schoolName:""
            , startDate: this.props.startDate?this.props.startDate:""
            , endDate: this.props.endDate?this.props.endDate:""
            , major: this.props.major?this.props.major:""
            , cumulativeGPA: this.props.cumulativeGPA?this.props.cumulativeGPA : ""
            , allSchools : ""
            , allMajors : ""
            , type : "UpdateEducationData"
            , error : null
        }

        this.editClick = this.editClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.schoolNameChangeHandler = this.schoolNameChangeHandler.bind(this);
        this.majorChange = this.majorChange.bind(this);
        this.onGPAChange = this.onGPAChange.bind(this);
        
    }

    componentWillMount(){
        debugger;
        axios.get(serverUrl+'getEducationMasterData')
                .then((response) => {
                    debugger;
                //update the state with the response data
                console.log("data " + response.data);
                this.setState({
                    allSchools : response.data[0][0].schools
                    ,allMajors : response.data[1][0].majors
                });
            });
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

    onGPAChange(e){
        this.setState({
            cumulativeGPA : e.target.value
        })
    }

    editClick(e) {
        e.preventDefault();
        this.setState({
            isEditEnabled : true
            ,isValueUpdated : false
        })
    }

    cancelClick(e) {
        e.preventDefault();
        this.setState({
            isEditEnabled : false
        })
    }

    saveClick(e) {
        debugger;
        e.preventDefault();
        axios.defaults.withCredentials = true;
        var isDataValid = true;
        if(!this.state.allMajors.includes(this.state.major)){
            isDataValid = false;
        }else if(!this.state.allSchools.includes(this.state.schoolName)){
            isDataValid = false;
        }else if(this.state.cumulativeGPA!="" && isNaN(parseFloat(this.state.cumulativeGPA))){
            isDataValid = false;
        }

        if(isDataValid){
            var data = {
                userId: this.props.email
                ,type : this.state.type
                ,schoolName : this.state.schoolName
                ,major : this.state.major
                ,cumulativeGPA : this.state.cumulativeGPA
                ,token : cookie.load('cookie')
            }
            axios.post(serverUrl+'profile',data)
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
        }else{
           this.setState({
               error : <label className="error">Enter Valid Data!!</label>
           }) 
        }
    }

    render() {
        debugger;
        var editButton = null;
        if(!this.props.isReadOnly){
            editButton = (<button type="button" className="cancelButton" onClick={this.editClick} >
                            <span>Edit</span>
                        </button>)
        }
        var eduData;
        if (!this.state.isEditEnabled && !this.state.isValueUpdated) {
            eduData = (<div className="row">
                            <div className="col-md-10">
                            <label>{this.props.schoolName}</label>
                            <p></p>
                            <label>{this.props.startDate} - {this.props.endDate}</label>
                            <p></p>
                            <label>Major in {this.props.major}</label>
                            <p></p>
                            <label>Cumulative GPA : {this.props.cumulativeGPA}</label>
                            </div>
                            <div className="col-md-2">
                                {editButton}
                            </div>
                        </div>);
        }else if(this.state.isValueUpdated) {
            eduData = (<div className="row">
                            <div className="col-md-10">
                            <label>{this.state.schoolName==""?this.props.schoolName:this.state.schoolName}</label>
                            <p></p>
                            <label>{this.props.startDate} - {this.props.endDate}</label>
                            <p></p>
                            <label>Major in {this.state.major==""?this.props.major:this.state.major}</label>
                            <p></p>
                            <label>Cumulative GPA : {this.state.cumulativeGPA==""?this.props.cumulativeGPA:this.state.cumulativeGPA}</label>
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
                                    <input type="text" onChange={this.majorChange} className="form-control" placeholder="Major" defaultValue={this.props.major} />
                                </div>
                                <label>Cumulative GPA</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onGPAChange} className="form-control" placeholder="Cumulative GPA" defaultValue={this.props.cumulativeGPA} />
                                </div>
                                <div className="form-group">
                                    {this.state.error}
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