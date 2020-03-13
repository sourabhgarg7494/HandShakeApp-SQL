import React, {Component} from 'react';
import '../../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import CompanyJobPreview from './CompanyJobPreview';
import SearchLoader from '../../Loader/SearchLoader';
import JobSearchLoader from '../../Loader/JobSearchLoader';
import {serverUrl} from '../../../config';

class CompanyJobPostings extends Component {
    constructor(props){
        super(props);
        this.state = {  
            jobData : []
            ,jobCount : 0
            ,jobApplications : []
            ,selectedJobId : null
        }

        this.onJobClick = this.onJobClick.bind(this);
    }

    componentWillMount(){
        debugger;
    }

    componentDidMount(){
        this.fetchJobListing();
    }

    fetchJobListing = function(){
        debugger;
        axios.defaults.withCredentials = true;

        var data;
        data = {
            type : "jobListLoad"
            ,token : cookie.load('cookie')
        }
        axios.post(serverUrl+'CompanyJobPosting',data)
                .then((response) => {
                    debugger;
                //update the state with the response data
                console.log("data " + response.data);
                let allJobs  = response.data[0].map(job => {
                    return {Id : job.Id
                        , title : job.JobTitle
                        , city : job.City
                        , state : job.State
                        , jobCategory : job.JobCategory
                    }
                });
                let allJobApplications  = response.data[2].map(job => {
                    return {Id : job.Id
                        , StudentId : job.StudentId 
                        , EmailId : job.EmailId
                        , FullName : job.FullName
                        , ResumePath : job.ResumePath
                        , Filename : job.Filename
                        , ApplicationStatus : job.ApplicationStatus
                    }
                });
                this.setState({
                    jobData : this.state.jobData.concat(allJobs)
                    ,jobCount : response.data[1][0].jobCount
                    ,jobApplications : this.state.jobApplications.concat(allJobApplications)
                });
            });
    }

    fetchJobDetails = function(job_Id){
        debugger;
        axios.defaults.withCredentials = true;
        var data;
        data = {
            type : "fetchJobApplications"
            ,jobId : job_Id
            ,token : cookie.load('cookie')
        }
        axios.post(serverUrl+'CompanyJobPosting',data)
                .then((response) => {
                    debugger;
                //update the state with the response data
                console.log("data " + response.data);
                let allJobApplications  = response.data[0].map(job => {
                    return {Id : job.Id
                        , StudentId : job.StudentId 
                        , EmailId : job.EmailId
                        , FullName : job.FullName
                        , ResumePath : job.ResumePath
                        , Filename : job.Filename
                        , ApplicationStatus : job.ApplicationStatus
                    }
                });
                this.setState({
                    jobApplications : this.state.jobApplications.concat(allJobApplications)
                });
            });
    }

    onJobClick(e){
        debugger;
        e.preventDefault();
        this.setState({
            jobApplications : []
            ,selectedJobId : e.target.dataset.value
        },() =>{this.fetchJobDetails(this.state.selectedJobId)})
    }

    render(){

        let Joblist = null;
        if(this.state.jobData.length){
            Joblist = this.state.jobData.map(job => {
                return (<div className="borderBottom">
                    <button className="jobButton" onClick={this.onJobClick} data-value = {job.Id}>
                        <div className="jobBasicData" data-value={job.Id}>
                            <div className="jobsBasicDataInsideContainer" data-value={job.Id}>
                                <div className="jobTitle" data-value={job.Id}>
                                    {job.title}
                                </div>
                                <div className="jobCompanyName" data-value={job.Id}>
                                    {job.city}, {job.state}
                                </div>
                                <div className="jobCategory" data-value={job.Id}>
                                    {job.jobCategory}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>)
            })
        }else{
            Joblist = <JobSearchLoader/>
        }

        let JobDetailsData = null;
        if(this.state.jobApplications.length){
            JobDetailsData = this.state.jobApplications.map(app => {
                return (<CompanyJobPreview data = {app}/>)
            }) 
        }else{
            JobDetailsData = [...Array(5)].map((e,i)=> {
                return (<SearchLoader/>)
            })
        }

        let redirectVar = null;
                if(cookie.load('cookie')){
                    redirectVar = <Redirect to="/CompanyJobPostings"/>
        }else{
            redirectVar = <Redirect to="/login"/>
        }
        return(
            <div className="JobsPostingMainDiv">
                {redirectVar}
                <div className="innerNav">
                    <div className="innerContainer">
                        <div className="innerNavBar">
                            <h2 className="innerNavBarHeading jobs">
                                Jobs Posted
                            </h2>
                            <div class="rightLinksSubNavBar">
                                <Link className="SubNavBarRightItem activeItem" to="/CompanyJobPostings">Job Search</Link>
                                <Link className="SubNavBarRightItem" to="/PostNewJob">Post New Job</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jobFilterAndDataContainer">
                    <div className="jobsMainData">
                        <div className="dataCard">
                            <div className="jobsDataInnerDiv">
                                <div className="leftListingJobs">
                                    <div className="jobsCount">
                                        <div className="jobCountData">
                                            <div className="jobCountItem">
                                                Total Job Count : {this.state.jobCount}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jobListContainer">
                                        <div className="jobsListInsideDiv">
                                            <div className="jobsListMain">
                                                {Joblist}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightMainData">
                                    {JobDetailsData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyJobPostings;