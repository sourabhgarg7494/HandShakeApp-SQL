import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { serverUrl } from '../../config';
import SearchLoader from '../Loader/SearchLoader';
import RegisteredEventDetails from './RegisteredEventDetails';

class RegisteredEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData : []
            ,eventCount : null
        }
    }

    componentDidMount(){
        debugger;
        this.searchApiCall();
    }

    searchApiCall = function(){
        axios.defaults.withCredentials = true;
        var data;
        data ={
            token : cookie.load('cookie')
        }
        axios.post(serverUrl+'getRegisteredEventList',data)
            .then((response) => {
                debugger;
                console.log(response);
                let outputData = response.data[0].map(eventData=>{
                    return {
                        EventName : eventData.EventName
                        ,CompanyName : eventData.CompanyName
                        ,EventDate : eventData.EventDate
                        ,EventTime : eventData.EventTime
                        ,State : eventData.State
                        ,City : eventData.City
                        ,Address : eventData.Address
                    }
                })
                //update the state with the response data
                this.setState({
                    searchData : this.state.searchData.concat(outputData)
                    ,eventCount : response.data[1][0].JobCount
                });
                console.log(response);
            });
    }

    render() {

        debugger;

        let registeredEventData = null;
        if(this.state.searchData.length){
            registeredEventData = this.state.searchData.map(eventData => {
                return (<RegisteredEventDetails data = {eventData}/>)
            }) 
        }else if(!this.state.searchData.length && this.state.jobCount == 0){
            registeredEventData = <label className="error">No Data Found!!</label>
        }else{
            registeredEventData = [...Array(this.state.rowCount)].map((e,i)=> {
                return (<SearchLoader/>)
            })
        }
        return (
            <div className="JobsPostingMainDiv">
                <div className="innerNav">
                    <div className="innerContainer">
                        <div className="innerNavBar">
                            <h2 className="innerNavBarHeading jobs">
                                Job Search
                            </h2>
                            <div class="rightLinksSubNavBar">
                                <Link className="SubNavBarRightItem" to="/StudentJobPostings">Job Search</Link>
                                <Link className="SubNavBarRightItem activeItem" to="/StudentApplications">Applications</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="StudentSearchMain">
                    <div className="StudentSearchDiv">
                        <div className="row">
                            <div className="col-md-12">
                                {/* {searchResultsComponent} */}
                                {/* <SearchLoader/> */}
                                {registeredEventData}
                                {/* <ApplicationResult/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisteredEvents;