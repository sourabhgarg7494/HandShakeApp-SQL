import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        let currentWorking = null;
        if(this.props.data && this.props.data.title !="" && this.props.data.companyName !=""){
            currentWorking = (<div class="titleAndCompanyMainDiv">
            <svg aria-hidden="true" data-prefix="fas" data-icon="briefcase" class="svgWorkIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z">
                </path>
            </svg>
            {this.props.data.title + " at " + this.props.data.companyName}
        </div>)
        }

        let path = "";
        if(this.props.data && this.props.data.profilePicPath !=""){
            path = "url('"+this.props.data.profilePicPath+"')";
        }

        return (
            <div className="dataCard">   
                <div>
                    <div class="cardDivWithPadding">
                        <div class="dataDivOutsideFlex">
                            <div class="studentPicOutSide">
                                <div class="studentPicCircleDiv">
                                    <div class="studentPicDiv" style={{backgroundImage : path}}>
                                    </div>
                                </div>
                            </div>
                            <div class="studentDetailsContent">
                                <div class="studentAndSchoolNameOuterDiv">
                                    <div class="studentAndSchoolNameInsideDiv">
                                        <h2 class="studentNameHeading">
                                            <Link className="linkClass" to={{
                                                            pathname: "/StudentProfile",
                                                            state: { isReadOnly: true, profileEmail : (!this.props.data?"":this.props.data.emailId) }
                                                        }}>
                                            {!this.props.data?"":this.props.data.fullName}</Link>
                                            {/* Add Link and Redirect to Student Profile  */}
                                        </h2>
                                        <div class="schoolNameDiv">
                                            {!this.props.data?"":this.props.data.schoolName}
                                        </div>
                                    </div>
                                    {/* Add Messaging Content Here */}
                                </div>
                                <div class="gradDateAndMajorOuterDiv">
                                    <div class="gradDateDiv">
                                        Graduates {!this.props.data?"":this.props.data.gradDate}
                                    </div>
                                    <div class="majorDiv">
                                        {!this.props.data?"":this.props.data.majorName}
                                    </div>
                                </div>
                                <div class="experienceAndOldInstitutionDiv">
                                    <div class="titleAndCompanyOuterDiv">
                                        <div>
                                            {currentWorking}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResults;