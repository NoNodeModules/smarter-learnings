import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import AdminfacultyJobData from "../Table/AdminfacultyJobData"
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';

let tasks = null;
class FacultyJobs extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+"courses/job";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyJobs">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<AdminfacultyJobData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default FacultyJobs;