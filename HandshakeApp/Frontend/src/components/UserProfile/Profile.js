import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Education from './Education';
import Overview from './OverviewCard';
import Skills from './Skills';
import Documents from './Documents';
import Personalinfo from './Personalinfo';
import Experience from './Experience';
import MyJourney from './myJourney';
import { connect } from "react-redux";
import {updateLoginInfo} from "../../js/actions/index";

class Profile extends Component {
    constructor(props){
        super(props);
        debugger;
        this.state = {  
             firstName : null
            ,lastName : null
            ,schoolName : null
            ,major : null
            ,cumulativeGPA : null
            ,skillsData : null
            ,documents : null
            ,experianceData : null
            ,myJourney : null
            ,emailId : null
            ,gender : null 
            ,startDate : null
            ,endDate : null
            ,userId : ""
            ,type : "FirstTimeLoad"
            ,email : this.props.email
        }
    }

    componentWillMount(){
        debugger;
        axios.defaults.withCredentials = true;
        var data;
        if(this.state.email){
            data = {
                userId:this.state.email
                ,type : this.state.type
            }
        }
        axios.post('http://localhost:3001/profile',data)
                .then((response) => {
                    debugger;
                //update the state with the response data
                this.setState({
                    myJourney : response.data[0][0].CarrerObjective
                    ,personalInfo : response.data[1][0]
                    ,emailId : response.data[1][0].EmailId
                    ,gender : response.data[1][0].Gender
                    ,firstName : response.data[2][0].FirstName
                    ,lastName : response.data[2][0].LastName
                    ,schoolName : response.data[2][0].SchoolName
                    ,major : response.data[2][0].Major
                    ,cumulativeGPA : response.data[2][0].CumulativeGPA
                    ,startDate : response.data[3][0].StartDate
                    ,endDate : response.data[3][0].EndDate
                    ,profilePicPath : response.data[2][0].ProfilePicturePath
                });
                console.log(response);
            });
    }
    componentDidMount(){
        debugger;
        // axios.defaults.withCredentials = true;
        // var data;
        // if(this.state.email){
        //     data = {
        //         userId:this.state.email
        //         ,type : this.state.type
        //     }
        // }
        // axios.post('http://localhost:3001/profile',data)
        //         .then((response) => {
        //             debugger;
        //         //update the state with the response data
        //         this.setState({
        //             myJourney : response.data[0][0].CarrerObjective
        //             ,personalInfo : response.data[1][0]
        //             ,emailId : response.data[1][0].EmailId
        //             ,gender : response.data[1][0].Gender
        //             ,firstName : response.data[2][0].FirstName
        //             ,lastName : response.data[2][0].LastName
        //             ,schoolName : response.data[2][0].SchoolName
        //             ,major : response.data[2][0].Major
        //             ,cumulativeGPA : response.data[2][0].CumulativeGPA
        //             ,startDate : response.data[3][0].StartDate
        //             ,endDate : response.data[3][0].EndDate
        //             ,profilePicPath : response.data[2][0].ProfilePicturePath
        //         });
        //         console.log(response);
        //     });
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container profileContainer">
                    <div className="row">
                        <div className="col-md-4">
                            <Overview firstName = {this.state.firstName}
                                    lastName = {this.state.lastName}
                                    schoolName = {this.state.schoolName}
                                    major = {this.state.major}
                                    cumulativeGPA = {this.state.cumulativeGPA}
                                    email = {this.state.email}
                                    profilePicPath = {this.state.profilePicPath} />
                            {/* <Skills/>
                            <Documents/> */}
                            <Personalinfo emailId = {this.state.emailId} gender = {this.state.gender}/>
                        </div>
                        <div className="col-md-8">
                            <MyJourney myJourney = {this.state.myJourney} email = {this.state.email}/>
                            <Education schoolName = {this.state.schoolName} startDate = {this.state.startDate}
                                        endDate = {this.state.endDate} major = {this.state.major}
                                        cumulativeGPA = {this.state.cumulativeGPA}
                                        email = {this.state.email} />
                            {/* <Experience/> */}
                        </div>
                    </div>
                </div> 
            </div> 
        )
    }
}


const mapStateToProps = state => {
    return { email: state.loginInfo.UserEmail };
};

const mapDispatchToProps = dispatch => {
    return {
        updateLoginInfo: loginInfo => dispatch(updateLoginInfo(loginInfo))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);