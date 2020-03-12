import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import JobPreviewLoader from '../Loader/JobPreviewLoader';
import JobSearchLoader from '../Loader/JobSearchLoader';
import EventPreview from './EventPreview'
import {serverUrl} from '../../config';

class EventPostings extends Component {
    constructor(props){
        super(props);
        this.state = {  
            eventName : ""
            ,eventData : []
            ,eventCount : null
            ,eventDetails : null
            ,selectedEventId : 0
            ,eventDetails : null
            ,currStudentMajor : null
        }

        this.onEventClick = this.onEventClick.bind(this);
        this.onEventNameInput = this.onEventNameInput.bind(this);
    }

    componentWillMount(){
        debugger;
    }

    componentDidMount(){
        this.fetchEventListing();
    }

    fetchEventListing = function(){
        debugger;
        axios.defaults.withCredentials = true;
        var data;
        data = {
            token: cookie.load('cookie')
            ,eventName : this.state.eventName
        }

        axios.post(serverUrl+'eventListings',data)
                .then((response) => {
                    debugger;
                //update the state with the response data
                console.log("data " + response.data);
                let allEvents  = response.data[0].map(event => {
                    return {Id : event.Id
                        , eventName : event.EventName
                        , company : event.CompanyName
                        , city : event.City
                        , state : event.State
                        , eventDate : event.EventDateTime
                    }
                });
                this.setState({
                    eventData : this.state.eventData.concat(allEvents)
                    ,eventCount : response.data[1][0].eventCount
                    ,eventDetails : response.data[2][0]
                    ,currStudentMajor : response.data[3][0]
                });
            });
    }

    fetchEventDetails = function(event_Id){
        debugger;
        axios.defaults.withCredentials = true;
        var data;
        data = {
            eventId : event_Id
            ,token : cookie.load('cookie')
        }
        axios.post(serverUrl+'eventDetails',data)
                .then((response) => {
                    debugger;
                //update the state with the response data
                console.log("data " + response.data);
                this.setState({
                    eventDetails : response.data[0][0]
                    ,currStudentMajor : response.data[1][0].Name
                });
                console.log(response);
            });
    }

    onEventNameInput(e){
        this.setState({
            eventName : e.target.value
            ,eventData : []
        },()=>{this.fetchEventListing()})
    }

    onEventClick(e){
        debugger;
        e.preventDefault();
        this.setState({
            eventDetails : null
            ,selectedEventId : e.target.dataset.value
        },() =>{this.fetchEventDetails(this.state.selectedEventId)})
    }

    render(){

        debugger;
        let Eventlist = null;
        if(this.state.eventData.length){
            Eventlist = this.state.eventData.map(event => {
                return (<div className="borderBottom">
                    <button className="jobButton" onClick={this.onEventClick} data-value = {event.Id}>
                        <div className="jobBasicData" data-value={event.Id}>
                            <div className="jobsBasicDataInsideContainer" data-value={event.Id}>
                                <div className="jobTitle" data-value={event.Id}>
                                    {event.eventName}
                                </div>
                                <div className="jobCompanyName" data-value={event.Id}>
                                    {event.company}, {event.city}, {event.state}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>)
            })
        }else if (!this.state.eventData.length && this.state.eventCount == 0){
            Eventlist = <label className="error">No Events Found!!</label>
        }else{
            Eventlist = <JobSearchLoader/>
        }

        let EventDetailsData = null;
        if(this.state.eventDetails){
            EventDetailsData = <EventPreview eventDetails = {this.state.eventDetails} currStudentMajor = {this.state.currStudentMajor}></EventPreview>
        }else{
            EventDetailsData = <JobPreviewLoader/>
        }

        let redirectVar = null;
                if(cookie.load('cookie')){
                    redirectVar = <Redirect to="/StudentEventPostings"/>
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
                                Event Search
                            </h2>
                            <div class="rightLinksSubNavBar">
                                <Link className="SubNavBarRightItem activeItem" to="/StudentEventPostings">Event Search</Link>
                                <Link className="SubNavBarRightItem" to="/StudentRegisteredEvents">Registered Events</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jobFilterAndDataContainer">
                    <div className="jobMainFilters">
                        <div className="dataCard">
                            <div className="insideDataCard">
                                <div className="searchInputContainers">
                                    <div className="col-md-4">
                                        <div class="inputContainers">
                                            <svg aria-hidden="true" data-prefix="fas" data-icon="search" class="svgJobFilter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                                                </path>
                                            </svg>
                                            <div>
                                                <div class="titleFilter form-group">
                                                    <input name="eventNameInput" onChange={this.onEventNameInput} placeholder="Event Name" type="text" id="eventNameInput" class="form-control titleInput" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jobsMainData">
                        <div className="dataCard">
                            <div className="jobsDataInnerDiv">
                                <div className="leftListingJobs">
                                    <div className="jobsCount">
                                        <div className="jobCountData">
                                            <div className="jobCountItem">
                                                Total Event Count : {this.state.eventCount}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jobListContainer">
                                        <div className="jobsListInsideDiv">
                                            <div className="jobsListMain">
                                                {Eventlist}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightMainData">
                                    {EventDetailsData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventPostings;