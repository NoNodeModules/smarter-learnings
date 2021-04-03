import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import UserJobData from "../Table/UserJobData";
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
let tasks = null;
class UserJobs extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+"courses/job/";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="userjob">
      <div>
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<UserJobData data={this.state.user}/>
</div>
        </p>}
        </div>
        </div>
    );
  }
}
 
export default UserJobs;