import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { serverUrl } from "../../config";

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditSkillsActive: false
            , skill: ""
            , error: null
        }

        this.editSkillsData = this.editSkillsData.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.cancelEditSkill = this.cancelEditSkill.bind(this);
        this.skillAddDelete = this.skillAddDelete.bind(this);
        this.addSkillsData = this.addSkillsData.bind(this);
    }

    addSkillsData(e) {
        e.preventDefault();
        debugger;
        var isSkillPresent = false;
        this.props.skillsData.filter(skill => {
            if (skill.Name === this.state.skill) {
                isSkillPresent = true;
            }
        })
        if (!isSkillPresent) {
            debugger;
            this.props.skillsData.push({Name : this.state.skill });
            var data = {
                skill: this.state.skill
                , userId: this.props.email
                ,token :cookie.load('cookie')
                , type : "AddUserSkill"
            };
            axios.post(serverUrl + 'updateSkill', data)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.setState({
                            isEditSkillsActive: false
                            , skill: ""
                            , error : null
                        });
                    }
                });
        } else {
            this.setState({
                error : <label className="error">Skill Already Present!!</label>
            });
        }

    }

    skillAddDelete(e) {
        this.setState({
            skill: e.target.value
        })
    }

    cancelEditSkill(e) {
        e.preventDefault();
        this.setState({
            isEditSkillsActive: false
        })
    }

    editSkillsData(e) {
        e.preventDefault();
        this.setState({
            isEditSkillsActive: true
        })
    }

    deleteSkill(e) {
        e.preventDefault();
        debugger;
        var deletedSkill = this.state.skill;
        var isSkillPresent;
        this.props.skillsData.filter(skill => {
            if (skill.Name === deletedSkill) {
                let index = this.props.skillsData.indexOf(skill);
                this.props.skillsData.splice(index, 1);
                isSkillPresent = true;
            }
        });
        if (isSkillPresent) {
            var data = {
                skill: deletedSkill
                , userId: this.props.email
                , token: cookie.load('cookie')
                , type : "DeleteUserSkill"
            };
            axios.post(serverUrl + 'updateSkill', data)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.setState({
                            isEditSkillsActive: false
                            , skill: ""
                            , error : null
                        });
                    }
                });
        } else{
            this.setState({
                error : <label className="error">Skill Not Found!!</label>
            });
            
        }
    }
    // componentDidMount(){
    //     axios.get('http://localhost:3001/')
    //             .then((response) => {
    //             //update the state with the response data
    //             this.setState({
    //                 books : this.state.books.concat(response.data) 
    //             });
    //         });
    // }

    render() {

        var editButton = null;
        if(!this.props.isReadOnly){
            editButton = (<button type="button" className="saveButton" onClick={this.editSkillsData}>
                            <span>Edit</span>
                         </button>)
        }

        var allSkills;
        debugger;
        if (this.props.skillsData) {
            allSkills = this.props.skillsData.map(skillsData => {
                return (
                    <tr>
                        <td>=></td>
                        <td>{skillsData.Name}</td>
                    </tr>
                )
            })
        }

        var buttons
        if (this.state.isEditSkillsActive) {
            buttons = (<div><div className="row">
                <label >Skill Name</label>
                <div className="form-group">
                    <input type="text" onChange={this.skillAddDelete} className="form-control" name="txtSkill" placeholder="Add/Delete Skill" />
                </div>
            </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="divSaveButton">
                            <div className="divButtonWrapper">
                                <button type="button" className="saveButton" onClick={this.addSkillsData}>
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="divCancelButton">
                            <div className="divButtonWrapper">
                                <button type="button" className="cancelButton" onClick={this.deleteSkill}>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div><div className="col-md-4">
                        <div className="divSaveButton">
                            <div className="divButtonWrapper">
                                <button type="button" className="saveButton" onClick={this.cancelEditSkill}>
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                    </div></div></div>);
        } else if (!this.state.isEditSkillsActive) {
            buttons = (<div className ="row"><div className="col-md-6">
                <div className="divSaveButton">
                    <div className="divButtonWrapper">
                        {editButton}
                    </div>
                </div>
            </div></div>);
        }


        return (
            <div className="dataCard">
                <div className="itemsmain">
                    <div>
                        <h2 className="CardHeading">Skills</h2>
                        <table className="skillTable">
                            <thead>
                                <tr>
                                    <th> No. </th>
                                    <th> Skill Name </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSkills}
                            </tbody>
                        </table>
                        {buttons}
                        {this.state.error}
                    </div>
                </div>
            </div>
        )
    }
}

export default Skills;