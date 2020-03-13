import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import SignUp from './Signup/SignUp';
import Profile from './UserProfile/Profile';
import CompanySignUp from './Company/Signup/CompanySignUp';
import StudentSearch from './StudentSearch/StudentSearch';
import CompanyProfile from './Company/Profile/CompanyProfile';
import JobsPostings from './Jobs/JobsPostings';
import Applications from './Jobs/Applications';
import EventPostings from './Events/EventPostings';
import RegisteredEvents from './Events/RegisteredEvents';
import CompanyJobPostings from './Company/PostJobs/CompanyJobPostings';
import PostNewJob from './Company/PostJobs/PostNewJob';
import EventListings from './Company/PostEvents/EventListings';
import PostNewEvent from './Company/PostEvents/PostNewEvent';


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/>
                <Route path="/Signup" component={SignUp}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/StudentProfile" component={Profile}/>
                <Route path="/Companysignup" component={CompanySignUp}/>
                <Route path="/CompanyProfile" component={CompanyProfile}/>
                <Route path="/StudentJobPostings" component={JobsPostings}/>
                <Route path="/StudentApplications" component={Applications}/>
                <Route path="/StudentEventPostings" component={EventPostings}/>
                <Route path="/StudentRegisteredEvents" component={RegisteredEvents}/>
                <Route path="/StudentSearch" component={StudentSearch}/>
                <Route path="/CompanyJobPostings" component={CompanyJobPostings}/> 
                <Route path="/PostNewJob" component={PostNewJob}/> 
                <Route path="/EventListings" component={EventListings}/> 
                <Route path="/PostNewEvent" component={PostNewEvent}/> 
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;