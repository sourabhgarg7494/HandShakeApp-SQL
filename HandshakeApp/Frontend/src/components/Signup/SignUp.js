import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const schoolOptions = ['San Jose City College', 'San Jose State College']
const defaultSchoolOption = schoolOptions[0]; 

const majorOptions = ['Computer Engineering'
                ,'Chemical Engineering'
                ,'Electric Engineering'
                ,'Industrial Engineering'
                ,'Software Engineering']
const defaultMajorOptions = majorOptions[0]; 

const monthOptions = ['Jan'
                ,'Feb'
                ,'Mar'
                ,'Apr'
                ,'May'
                ,'Jun'
                ,'Jul'
                ,'Aug'
                ,'Sep'
                ,'Oct'
                ,'Nov'
                ,'Dec'
            ]
const defaultmonthOptions = monthOptions[0]; 

const yearOptions = ['2020'
                ,'2021'
                ,'2022'
                ,'2023'
                ,'2024'
                ,'2025'
                ,'2026'
                ,'2027'
                ,'2028'
                ,'2029'
                ,'2030'
                ,'2031'
            ]
const defaulYearOptions = yearOptions[0]; 
//Define a Sign up Component
class SignUp extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            School: "",
            FirstName: "",
            LastName: "",
            EmailAddress: "",
            Major: "",
            GradMonth: "",
            GradYear: "",
            Password: "",
            Schools : [{ Id: 0, Name : "-Select-"}],
            isPasswordConfirmed : true,
            authFlag: null
        }

        this.defaultOption = this.state.Schools[0];
        //Bind the handlers to this class
        //this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);

        this.userFirstnameChangeHandler = this.userFirstnameChangeHandler.bind(this);
        this.userLastnameChangeHandler = this.userLastnameChangeHandler.bind(this);
        this.userEmailAddressChangeHandler = this.userEmailAddressChangeHandler.bind(this);

        this.onSchoolSelect = this.onSchoolSelect.bind(this);
        this.onGradMonthSelect = this.onGradMonthSelect.bind(this);
        this.onGradYearSelect = this.onGradYearSelect.bind(this);
        this.onMajorSelect = this.onMajorSelect.bind(this);

        this.confirmpasswordChangeHandler = this.confirmpasswordChangeHandler.bind(this);
    }

    componentDidMount(){
        console.log("did mount");
        axios.get('http://localhost:3001/signup')
                .then((response) => {
                //update the state with the response data
                console.log("data " + response.data);
                this.setState({
                    Schools : this.state.Schools.concat(response.data) 
                    // Schools : Object.assign(this.state.Schools,response.data) 
                });
            });
    }
    componentWillMount() {
        this.setState({
            authFlag: null
        })
    }

    onSchoolSelect(optionSelected){
        const name = this.name;
        this.setState({
            School : optionSelected.value
        })
    }

    onGradMonthSelect(optionSelected){
        const name = this.name;
        this.setState({
            GradMonth : optionSelected.value
        })
    }

    onGradYearSelect(optionSelected){
        const name = this.name;
        this.setState({
            GradYear : optionSelected.value
        })
    }

    onMajorSelect(optionSelected){
        const name = this.name;
        debugger;
        this.setState({
            Major : optionSelected.value
        })
    }

    userFirstnameChangeHandler = (e) =>{
        this.setState({
            FirstName: e.target.value
        })
    }

    userLastnameChangeHandler = (e) =>{
        this.setState({
            LastName: e.target.value
        })
    }

    userEmailAddressChangeHandler = (e) =>{
        this.setState({
            EmailAddress: e.target.value
        })
    }

    confirmpasswordChangeHandler = (e) =>{
        if (this.state.Password != e.target.value){
            this.setState({
                isPasswordConfirmed : false
            })
        }else{
            this.setState({
                isPasswordConfirmed : true
            }) 
        }
    }

    //username change handler to update state variable with the text entered by the user
    // usernameChangeHandler = (e) => {
    //     this.setState({
    //         username: e.target.value
    //     })
    // }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
    }
    //submit Create handler to send a request to the node backend
    submitCreate = (e) => {
        //prevent page from refresh
        e.preventDefault();

        const data = {
            School : this.state.School,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            EmailAddress: this.state.EmailAddress,
            Major: this.state.Major,
            GradMonth: this.state.GradMonth,
            GradYear: this.state.GradYear,
            Password: this.state.Password
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data 
        axios.post('http://localhost:3001/Signup', data)
            .then(response => {
                console.log("Response : ", response);
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    if (response.data === "User Created") {
                        this.setState({
                            authFlag: true
                        })

                    } else {
                        this.setState({
                            authFlag: false
                        })
                    }
                } else {
                    this.setState({
                        authFlag: null
                    })
                }
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/Login" />
        }
        let error = null;
        if (!this.state.isPasswordConfirmed) {
            console.log(this.state.isPasswordConfirmed);
            error = <label className="error">Password did not match!!</label>
        }

        let signup = null;
        if (!this.state.authFlag) {
            signup = (<div className="main-div">
                    <div className="col-md-12">  
                        <label >School</label>
                        <div className="form-group">
                            <Dropdown options={schoolOptions} onChange={this.onSchoolSelect} value={defaultSchoolOption} placeholder="Select a school" />
                        </div>
                    </div> 
                    <div className="col-md-6">
                        <label >First Name</label>
                        <div className="form-group">
                            <input onChange={this.userFirstnameChangeHandler} type="text" className="form-control" name="txtFirstName" placeholder="First Name" />
                        </div>
                    </div>   
                    <div className="col-md-6">
                        <label >Last Name</label>
                        <div className="form-group">
                            <input onChange={this.userLastnameChangeHandler} type="text" className="form-control" name="txtLastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label>Email Address</label>
                        <div className="form-hint">Please use your school email</div>
                        <div className="form-group">
                            <input onChange={this.userEmailAddressChangeHandler} type="text" className="form-control" name="txtEmail" placeholder="Email Address" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label>Major</label> 
                        <div className="form-group">
                            <Dropdown options={majorOptions} onChange={this.onMajorSelect} value={defaultMajorOptions} placeholder="Select a major" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label>Grad Month</label>
                        <div className="form-group">
                            <Dropdown options={monthOptions} onChange={this.onGradMonthSelect} value={defaultmonthOptions} placeholder="Select Grad Month" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label> Grad Year </label>
                        <div className="form-group">
                            <Dropdown options={yearOptions} onChange={this.onGradYearSelect} value={defaulYearOptions} placeholder="Select Grad Year" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label>Password</label>
                        <div className="form-group">
                            <input onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="col-md-6">
                    <label>Confirm Password</label>
                        <div className="form-group">
                            <input onBlur={this.confirmpasswordChangeHandler} type="password" className="form-control" name="password" placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                         {error}
                        </div>
                    </div>
                    <div className="col-md-12" id="button">
                        <div className="form-group">
                            <button onClick={this.submitCreate} className="btn btn-primary">Sign UP</button>
                        </div>
                    </div>
                </div>) ;
        }else{
            signup = <div className="main-div"><label>User Created!! Login to Continue.</label></div>
        }
        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="col-md-4 col-md-offset-1 content" >
                        <h1 className="heading margin-top">Join the Handshake community</h1>
                        <div>
                            <p className="subtitle">Discover jobs and internships based on your interests.</p>
                        </div>
                        <div data-bind="invisible: prompt_for_linked_account_password">
                            <a href="#">Are you an employer? Create an account here.</a>
                        </div>
                    </div>
                    <div className="col-md-6 content margin-top">
                        {signup}
                    </div>
                </div>
            </div>
        )
    }
}
//export SignUp Component
export default SignUp;