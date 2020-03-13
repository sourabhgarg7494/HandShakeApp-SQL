import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {serverUrl} from '../../config'

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditEnabled: false
            , isValueUpdated: false
            , type : "UpdateExperienceData"
            , error : null
            , experienceData : this.props.experienceData ?this.props.experienceData: {CompanyName : ""
                                                                                , Title : ""
                                                                                , Address : ""
                                                                                , State : ""
                                                                                , City : ""
                                                                                ,Country : ""
                                                                                ,StartDate : ""
                                                                                ,EndDate : ""
                                                                                ,WorkDescription : "" }
            ,allCities : ""
            ,allStates : ""
            ,allCountries : ""
        }

        this.editClick = this.editClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.companyNameChangeHandler = this.companyNameChangeHandler.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.workDescriptionChange = this.workDescriptionChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        
    }

    componentWillMount(){
        debugger;
        axios.get(serverUrl+'getExperienceMasterData')
                .then((response) => {
                    debugger;
                //update the state with the response data
                console.log("data " + response.data);
                this.setState({
                    allCountries : response.data[0][0].Countries
                    ,allCities : response.data[2][0].cities
                    ,allStates : response.data[1][0].States
                });
            });
    }

    companyNameChangeHandler (e){
        var exdata = this.state.experienceData;
        exdata.CompanyName = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    onStartDateChange(e){
        var exdata = this.state.experienceData;
        exdata.StartDate = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    onEndDateChange(e){
        var exdata = this.state.experienceData;
        exdata.EndDate = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    titleChange (e){
        var exdata = this.state.experienceData;
        exdata.Title = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    workDescriptionChange(e){
        var exdata = this.state.experienceData;
        exdata.WorkDescription = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    onAddressChange(e){
        var exdata = this.state.experienceData;
        exdata.Address = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    onStateChange(e){
        var exdata = this.state.experienceData;
        exdata.State = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    onCityChange(e){
        var exdata = this.state.experienceData;
        exdata.City = e.target.value
        this.setState({
            experienceData : exdata
        })
    }

    onCountryChange(e){
        var exdata = this.state.experienceData;
        exdata.Country = e.target.value
        this.setState({
            experienceData : exdata
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
        if(!this.state.allCities.includes(this.state.experienceData.City)){
            isDataValid = false;
        }else if(!this.state.allStates.includes(this.state.experienceData.State)){
            isDataValid = false;
        }else if(!this.state.allCountries.includes(this.state.experienceData.Country)){
            isDataValid = false;
        }

        if(isDataValid){
            var data = {
                userId: this.props.email
                ,type : this.state.type
                ,CompanyName : this.state.experienceData.CompanyName
                ,Title : this.state.experienceData.Title
                ,Address : this.state.experienceData.Address
                ,State : this.state.experienceData.State
                ,City : this.state.experienceData.City
                ,Country : this.state.experienceData.Country
                ,StartDate : this.state.experienceData.StartDate
                ,EndDate : this.state.experienceData.EndDate
                ,WorkDescription : this.state.experienceData.WorkDescription
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
                            <label>Company Name: {this.props.experienceData?this.props.experienceData.CompanyName:""}</label>
                            <p></p>
                            <label> From : {this.props.experienceData?this.props.experienceData.StartDate+" ":""} 
                                 To : {this.props.experienceData?this.props.experienceData.EndDate:""}</label>
                            <p></p>
                            <label>Job Title : {this.props.experienceData?this.props.experienceData.Title:""}</label>
                            <p></p>
                            <label>Address :{this.props.experienceData?this.props.experienceData.Address+
                                                        ", "+this.props.experienceData.City+
                                                        ", "+this.props.experienceData.State+
                                                        ", "+this.props.experienceData.Country:""}</label>
                            <p></p>
                            <label>Work Description : {this.props.experienceData? this.props.experienceData.WorkDescription:""}</label>
                            </div>
                            <div className="col-md-2">
                                {editButton}
                            </div>
                        </div>);
        }else if(this.state.isValueUpdated) {
            eduData = (<div className="row">
                        <div className="col-md-10">
                        <label>Company Name: {this.state.experienceData.CompanyName==""?this.props.experienceData.CompanyName:this.state.experienceData.CompanyName}</label>
                        <p></p>
                        <label> From : {(this.state.experienceData.StartDate==""?this.props.experienceData.StartDate:this.state.experienceData.StartDate)+" "} 
                            To : {this.state.experienceData.EndDate==""?this.props.experienceData.EndDate:this.state.experienceData.EndDate}</label>
                        <p></p>
                        <label>Job Title : {this.state.experienceData.Title==""?this.props.experienceData.Title:this.state.experienceData.Title}</label>
                        <p></p>
                        <label>Address :{(this.state.experienceData.Address==""?this.props.experienceData.Address:this.state.experienceData.Address)+
                                                    ", "+(this.state.experienceData.City==""?this.props.experienceData.City:this.state.experienceData.City)+
                                                    ", "+(this.state.experienceData.State==""?this.props.experienceData.State:this.state.experienceData.State)+
                                                    ", "+(this.state.experienceData.Country==""?this.props.experienceData.Country:this.state.experienceData.Country)}</label>
                        <p></p>
                        <label>Work Description : {(this.state.experienceData.WorkDescription==""?this.props.experienceData.WorkDescription:this.state.experienceData.WorkDescription)}</label>
                        </div>
                        <div className="col-md-2">
                            {editButton}
                        </div>
                    </div>);
        }else {
            eduData = (<div className="row">
                            <div className="col-md-10">
                                <label>Company Name</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.companyNameChangeHandler} className="form-control" placeholder="Company Name" defaultValue={this.state.isValueUpdated?this.state.experienceData.CompanyName:(!this.props.experienceData?"":this.props.experienceData.CompanyName)} />
                                </div>
                                <label>Start Date</label>
                                    <div className="form-group">
                                    <input type="text" className="form-control" onChange={this.onStartDateChange} placeholder="Start Date" defaultValue={this.state.isValueUpdated?this.state.experienceData.StartDate:(!this.props.experienceData?"":this.props.experienceData.StartDate)} />
                                </div>
                                <label>End Date</label>
                                    <div className="form-group">
                                    <input type="text"  className="form-control" onChange={this.onEndDateChange} placeholder="End Date" defaultValue={this.state.isValueUpdated?this.state.experienceData.EndDate:(!this.props.experienceData?"":this.props.experienceData.EndDate)} />
                                </div>
                                <label>Title</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.titleChange} className="form-control" placeholder="Title" defaultValue={this.state.isValueUpdated?this.state.experienceData.Title:(!this.props.experienceData?"":this.props.experienceData.Title)} />
                                </div>
                                <label>Work Description</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.workDescriptionChange} className="form-control" placeholder="Work Description" defaultValue={this.state.isValueUpdated?this.state.experienceData.WorkDescription:(!this.props.experienceData?"":this.props.experienceData.WorkDescription)} />
                                </div>
                                <label>Address</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onAddressChange} className="form-control" placeholder="Address" defaultValue={this.state.isValueUpdated?this.state.experienceData.Address:(!this.props.experienceData?"":this.props.experienceData.Address)} />
                                </div>
                                <label>State</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onStateChange} className="form-control" placeholder="State" defaultValue={this.state.isValueUpdated?this.state.experienceData.State:(!this.props.experienceData?"":this.props.experienceData.State)} />
                                </div>
                                <label>City</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onCityChange} className="form-control" placeholder="City" defaultValue={this.state.isValueUpdated?this.state.experienceData.City:(!this.props.experienceData?"":this.props.experienceData.City)} />
                                </div>
                                <label>Country</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onCountryChange} className="form-control" placeholder="Country" defaultValue={this.state.isValueUpdated?this.state.experienceData.Country:(!this.props.experienceData?"":this.props.experienceData.Country)} />
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
                    <h2 className="CardHeading">Experience</h2>
                    <label></label>
                    {eduData}

                </div>
            </div>
        )
    }
}

export default Experience;