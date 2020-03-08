import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { serverUrl } from "../../config";

class Overview extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            isEditEnabled: false
            ,type : "UpdateOverviewData"
            ,firstName : ""
            ,lastName : ""
            ,isValueUpdated : false
            ,profilePic : null
            ,isProfilePicUploadActivated : false
            ,profilePicPath : ""
        }

        this.editClick = this.editClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.onProfileButtonClick = this.onProfileButtonClick.bind(this);
        this.cancelUploadClick = this.cancelUploadClick.bind(this);
        this.isProfilePicUploaded = false;
    }

    onProfilePicUpload(e) {
        this.setState({
            profilePic : e.target.files[0]
        });
    }

    onProfileButtonClick(){
        this.setState({
            isProfilePicUploadActivated : true
        });
    }

    uploadProfilePic(ev){
        ev.preventDefault();  
        const d = new FormData();
        d.append("file",this.state.profilePic);
        d.append("userId",this.props.email);
        d.append("token", cookie.load('cookie'));
        console.log(d.values());
        this.setState({
            type : "uploadProfilePic"
        });
        axios.post(serverUrl+'uploadProfilePic',d)
        .then((response) => {
            console.log(response);
            if(response.status === 200 && response.data.file !== ""){
                this.setState({
                    isProfilePicUploadActivated : false
                    ,profilePicPath : response.data.file
                });
                this.isProfilePicUploaded = true;
            }
        });
    }

    cancelUploadClick(e){
        e.preventDefault();
        this.setState({
            isProfilePicUploadActivated : false
        })
    }
    cancelClick(e) {
        e.preventDefault();
        this.setState({
            isEditEnabled : false
        })
    }

    firstnameChangeHandler(e){
        this.setState({
            firstName : e.target.value
        })
    }

    lastnameChangeHandler(e){
        this.setState({
            lastName : e.target.value
        })
    }

    saveClick(e) {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        debugger;
        var data = {
            userId: this.props.email
            ,type : this.state.type
            ,firstName: this.state.firstName
            ,lastName : this.state.lastName
        }
        axios.post(serverUrl+'profile',data)
                .then((response) => {
                //update the state with the response data

                console.log(response);
                if(response.status === 200){
                    this.setState({
                        isEditEnabled : false
                        ,isValueUpdated : true
                        ,firstName : response.data[0][0].FirstName
                        ,lastName : response.data[0][0].LastName
                    });   
                }else{
                    this.setState({
                        isEditEnabled : false
                        ,isValueUpdated : false
                    });
                }
            });
    }

    editClick(e) {
        e.preventDefault();
        this.setState({
            isEditEnabled : true
        })
        console.log(this.state.isValueUpdated);
    }

    render() {

        var editButton = null;
        var profilePicDisabled = '';
        if(!this.props.isReadOnly){
            editButton = (<button className="editButton" onClick={this.editClick}>
                            <svg className="svgForEdit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M493.26 56.26l-37.51-37.51C443.25 6.25 426.87 0 410.49 0s-32.76 6.25-45.25 18.74l-74.49 74.49L256 127.98 12.85 371.12.15 485.34C-1.45 499.72 9.88 512 23.95 512c.89 0 1.79-.05 2.69-.15l114.14-12.61L384.02 256l34.74-34.74 74.49-74.49c25-25 25-65.52.01-90.51zM118.75 453.39l-67.58 7.46 7.53-67.69 231.24-231.24 31.02-31.02 60.14 60.14-31.02 31.02-231.33 231.33zm340.56-340.57l-44.28 44.28-60.13-60.14 44.28-44.28c4.08-4.08 8.84-4.69 11.31-4.69s7.24.61 11.31 4.69l37.51 37.51c6.24 6.25 6.24 16.4 0 22.63z">
                                </path>
                            </svg>
                            <span></span>
                        </button>)
            profilePicDisabled = ''
        }else{
            profilePicDisabled = 'true'
        }

        if(this.props.profilePicPath){
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
                <button className="profilePicButton" type="button" disabled={profilePicDisabled} onClick={this.onProfileButtonClick}>
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
            profileMainButton =(<button className="profilePicButton" disabled={profilePicDisabled} type="button" onClick={this.onProfileButtonClick}>
                                    <img src={!this.state.profilePicPath?this.props.profilePicPath:this.state.profilePicPath} alt={this.state.profilePicPath} style={{width: '100%'}}></img>
                                </button>);
        }

        let cardData;
        if (this.state.isEditEnabled) {
            cardData = (<div className="editForm">
                <div className="row">
                    <div className="col-md-6">
                        <label >Preffered Name</label>
                        <div className="form-group">
                            <input type="text"style={{textTransform: 'capitalize'}}  onChange={this.firstnameChangeHandler} className="form-control" name="txtFirstName" placeholder="First Name" defaultValue={this.props.firstName} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label >Last Name</label>
                        <div className="form-group">
                            <input type="text" style={{textTransform: 'capitalize'}} onChange={this.lastnameChangeHandler} className="form-control" name="txtLastName" placeholder="Last Name" defaultValue={this.props.lastName} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label >School Year</label>
                        <div className="form-group">
                            <input type="text" disabled style={{textTransform: 'capitalize'}} className="form-control" name="txtSchoolYear" placeholder="Masters" />
                        </div>
                    </div>
                </div>
                <div className="yearLabelText">This field is locked by your school. If you would like to change it, please contact your career office.</div>
                <div className="divButtons">
                    <div className="divCancelButton" >
                        <div className="divButtonWrapper" >
                            <button type="button" className="cancelButton" onClick={this.cancelClick}>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                    <div className="divSaveButton">
                        <div className="divButtonWrapper">
                            <button type="button" className="saveButton" onClick={this.saveClick}>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>)
        } else if(this.state.isEditEnabled && this.state.isValueUpdated){
            cardData = (<div className="editForm">
                <div className="row">
                    <div className="col-md-6">
                        <label >Preffered Name</label>
                        <div className="form-group">
                            <input type="text" onChange={this.firstnameChangeHandler} style={{textTransform: 'capitalize'}} className="form-control" name="txtFirstName" placeholder="First Name" defaultValue={this.state.firstName} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label >Last Name</label>
                        <div className="form-group">
                            <input type="text" onChange={this.lastnameChangeHandler} style={{textTransform: 'capitalize'}} className="form-control" name="txtLastName" placeholder="Last Name" defaultValue={this.state.lastName} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label >School Year</label>
                        <div className="form-group">
                            <input type="text" disabled className="form-control" style={{textTransform: 'capitalize'}} name="txtSchoolYear" placeholder="Masters" />
                        </div>
                    </div>
                </div>
                <div className="yearLabelText">This field is locked by your school. If you would like to change it, please contact your career office.</div>
                <div className="divButtons">
                    <div className="divCancelButton" >
                        <div className="divButtonWrapper" >
                            <button type="button" className="cancelButton" onClick={this.cancelClick}>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                    <div className="divSaveButton">
                        <div className="divButtonWrapper">
                            <button type="button" className="saveButton" onClick={this.saveClick}>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>)
        } else if (this.state.isValueUpdated){
            cardData = (<div>
                <h1 className="nameHeading">{this.state.firstName + " " + this.state.lastName} </h1>
                <div className="collegeNameDiv">
                    {this.props.schoolName}
                </div>
                <div className="divAfterDegree">
                    {this.props.major}
                </div>
                <div className="divSpace"></div>
                <div className="fullstory-hidden">
                    <div className="divGPA">
                        GPA: {this.props.cumulativeGPA}
                    </div>
                </div>
            </div>);
        } else {
            cardData = (<div>
                <h1 className="nameHeading">{this.props.firstName + " " + this.props.lastName} </h1>
                <div className="collegeNameDiv">
                    {this.props.schoolName}
                </div>
                <div className="divAfterDegree">
                    {this.props.major}
                </div>
                <div className="divSpace"></div>
                <div className="fullstory-hidden">
                    <div className="divGPA">
                        GPA: {this.props.cumulativeGPA}
                    </div>
                </div>
            </div>);
        }

        return (
            <div className="dataCard">
                <div className="itemsmain">
                    <div className="pos" id="profilePicture">
                        <div className="CClogo">
                            <div className="logoInside">
                                <div className="avatarImage">
                                </div>
                            </div>
                        </div>
                        <div className="editButtonDiv">
                            {editButton}
                        </div>
                        <div className="mainOverViewCardData">
                            <div >
                                <div className="divProfilePicButton">
                                    {profileMainButton}
                                </div>
                                {profilePicUploadSection}
                            </div>
                            {cardData}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Overview;