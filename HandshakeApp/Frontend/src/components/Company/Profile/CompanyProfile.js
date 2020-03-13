import React, {Component} from 'react';
import '../../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { serverUrl } from "../../../config";

class CompanyProfile extends Component {
    constructor(props){
        super(props);
        debugger;
        this.state = {  
             companyData : {CompanyName : ""
                            ,Address : ""
                            ,Country : ""
                            ,State : ""
                            ,City : ""
                            ,Description : ""
                            ,Phone : ""
                            ,ProfilePicturePath : ""
                            ,EmailId : ""
                        }
            ,userId : ""
            ,type : "FirstTimeLoad"
            ,email : ""
            ,isProfilePicUploadActivated : false
            ,allCountries: ""
            ,allCities : ""
            ,allStates : ""
            ,isValueUpdated : false
            ,error : null
            ,profilePic : null
        }

        this.onProfileButtonClick = this.onProfileButtonClick.bind(this);
        this.cancelUploadClick = this.cancelUploadClick.bind(this);
        this.companyNameChangeHandler = this.companyNameChangeHandler.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.isProfilePicUploaded = false;
    }

    componentWillMount(){
        debugger;
        axios.defaults.withCredentials = true;
        var data;
        if(cookie.load('cookie')){
            data = {
                userId:this.state.email
                ,token:cookie.load('cookie')
                ,type : this.state.type
            }
        }
        axios.get(serverUrl+'companyProfile')
                .then((response) => {
                    debugger;
                console.log(response);
                if(response.status === 200 && response.data){
                    this.setState({
                        allCountries : response.data[0][0].Countries
                        ,allStates : response.data[1][0].States
                        ,allCities : response.data[2][0].cities
                    })
                }
            });
    }
    componentDidMount(){
        debugger;
        axios.defaults.withCredentials = true;
        var data;
        if(cookie.load('cookie')){
            data = {
                userId:this.state.email
                ,token:cookie.load('cookie')
                ,type : this.state.type
            }
        }
        axios.post(serverUrl+'companyProfile',data)
                .then((response) => {
                    debugger;
                console.log(response);
                if(response.status === 200 && response.data){
                    var companyProfileData;
                    companyProfileData = response.data[0][0]
                    this.setState({
                        companyData : companyProfileData
                    })
                }
            });
    }

    onProfileButtonClick(){
        this.setState({
            isProfilePicUploadActivated : true
        });
    }

    onProfilePicUpload(e) {
        this.setState({
            profilePic : e.target.files[0]
        });
    }

    cancelUploadClick(e){
        e.preventDefault();
        this.setState({
            isProfilePicUploadActivated : false
        })
    }

    uploadProfilePic(ev){
        ev.preventDefault();  
        const d = new FormData();
        d.append("file",this.state.profilePic);
        //d.append("userId",this.props.email);
        d.append("token", cookie.load('cookie'));
        console.log(d.values());
        this.setState({
            type : "uploadProfilePic"
        });
        axios.post(serverUrl+'uploadProfilePic',d)
        .then((response) => {
            console.log(response);
            if(response.status === 200 && response.data.file !== ""){
                var compData = this.state.companyData;
                compData.ProfilePicturePath = response.data.file
                this.setState({
                    isProfilePicUploadActivated : false
                    ,companyData : compData
                });
                this.isProfilePicUploaded = true;
            }
        });
    }

    companyNameChangeHandler(e){
        debugger;
        var compData = this.state.companyData;
        compData.CompanyName = e.target.value;
        this.setState({
            companyData : compData
        })
    }

    onAddressChange(e){
        var compData = this.state.companyData;
        compData.Address = e.target.value;
        this.setState({
            companyData : compData
        })
    }

    onCountryChange(e){
        var compData = this.state.companyData;
        compData.Country = e.target.value;
        this.setState({
            companyData : compData
        })
    }

    onStateChange(e){
        var compData = this.state.companyData;
        compData.State = e.target.value;
        this.setState({
            companyData : compData
        })
    }

    onCityChange(e){
        var compData = this.state.companyData;
        compData.City = e.target.value;
        this.setState({
            companyData : compData
        })
    }
    onDescriptionChange(e){
        var compData = this.state.companyData;
        compData.Description = e.target.value;
        this.setState({
            companyData : compData
        })
    }

    onPhoneChange(e){
        var compData = this.state.companyData;
        compData.Phone = e.target.value;
        this.setState({
            companyData : compData
        })
    }

    saveData(e){
        e.preventDefault();
        debugger;
        var isValidData = true;

        if(!this.state.allCities.includes(this.state.companyData.City)){
            isValidData = false;
        }else if(!this.state.allStates.includes(this.state.companyData.State)){
            isValidData = false;
        }else if(!this.state.allCountries.includes(this.state.companyData.Country)){
            isValidData = false;
        }else if(!this.state.companyData.Phone.match(/^\d{10}$/)){
            isValidData = false;
        }

        if(isValidData){
            axios.defaults.withCredentials = true;
            var data;
            if(cookie.load('cookie')){
                data = {
                    type : "updateCompanyProfile"
                    ,userId:this.state.email
                    ,token:cookie.load('cookie')
                    ,CompanyName : this.state.companyData.CompanyName
                    ,CompanyAddress : this.state.companyData.Address
                    ,Country : this.state.companyData.Country
                    ,State : this.state.companyData.State
                    ,City : this.state.companyData.City
                    ,Description : this.state.companyData.Description
                    ,Phone : this.state.companyData.Phone
                }
            }
            axios.post(serverUrl+'companyProfile',data)
                    .then((response) => {
                        debugger;
                    console.log(response);
                    if(response.status === 200 && response.data){
                        this.setState({
                            isValueUpdated : true
                            ,error : <label className="error">Company Profile Updated !!</label>
                        })
                    }
                });
        }else{
            this.setState({
                error : <label className="error">Enter Valid Data!!</label>
            }) 
        }
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }

        if(this.state.companyData.ProfilePicturePath){
            this.isProfilePicUploaded = true;
        }
        let profileMainButton;
        let profilePicUploadSection;
        if(this.state.isProfilePicUploadActivated){
            profilePicUploadSection = (<div><div className="row">
                <div className="col-md-12">
                    <input type="file" id="profilePic" name="profilePic" accept="image/png, image/jpeg" onChange={this.onProfilePicUpload}>
                    </input>
                </div>
            </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="divSaveButton">
                            <div className="divButtonWrapper">
                                <button type="button" className="saveButton" onClick={this.uploadProfilePic}>
                                    <span>Upload</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="divCancelButton">
                            <div className="divButtonWrapper">
                                <button type="button" className="cancelButton" onClick={this.cancelUploadClick}>
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div></div>);
        } else if(!this.state.isProfilePicUploadActivated){
            profilePicUploadSection = null;
        }
        
        if(!this.isProfilePicUploaded){
            profileMainButton = (
                <button className="profilePicButton" type="button" onClick={this.onProfileButtonClick}>
                    <div className="divInsideButton">
                        <svg data-prefix="fas" data-icon="camera" className="svgInsideProfilePic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z">
                            </path>
                        </svg>
                        <div className="addPhotoText">
                            Add Photo
                        </div>
                    </div>
                </button>);
        } else if(this.isProfilePicUploaded){
            profileMainButton =(<button className="profilePicButton" type="button" onClick={this.onProfileButtonClick}>
                                    <img src={this.state.companyData.ProfilePicturePath} alt={this.state.companyData.ProfilePicturePath} style={{width: '100%'}}></img>
                                </button>);
        }

        return(
            <div>
                {redirectVar}
                <div className="container profileContainer">
                    <div className="row">
                        <div className="col-md-4">
                            {profileMainButton}
                            {profilePicUploadSection}
                          
                        </div>
                        <div className="col-md-8">
                                <label>Company Name</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.companyNameChangeHandler} className="form-control" placeholder="Company Name" defaultValue={this.state.companyData.CompanyName} />
                                </div>
                                <label>Company Address</label>
                                    <div className="form-group">
                                    <input type="text" className="form-control" onChange={this.onAddressChange} placeholder="Start Date" defaultValue={this.state.companyData.Address} />
                                </div>
                                <label>Country</label>
                                    <div className="form-group">
                                    <input type="text"  className="form-control" onChange={this.onCountryChange} placeholder="End Date" defaultValue={this.state.companyData.Country} />
                                </div>
                                <label>State</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onStateChange} className="form-control" placeholder="Title" defaultValue={this.state.companyData.State} />
                                </div>
                                <label>City</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onCityChange} className="form-control" placeholder="Work Description" defaultValue={this.state.companyData.City} />
                                </div>
                                <label>Description</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onDescriptionChange} className="form-control" placeholder="Address" defaultValue={this.state.companyData.Description} />
                                </div>
                                <label>Phone</label>
                                    <div className="form-group">
                                    <input type="text" onChange={this.onPhoneChange} className="form-control" placeholder="State" defaultValue={this.state.companyData.Phone} />
                                </div>
                                <div className="form-group">
                                    {this.state.error}
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="saveButton" onClick={this.saveData}>
                                        <span>Save</span>
                                    </button>
                                </div>
                        </div>
                    </div>
                    <div className="margin-bottom-24"></div>
                </div> 
            </div> 
        )
    }
}


export default CompanyProfile;