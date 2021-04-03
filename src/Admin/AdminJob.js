import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import AdminAdminJob from "../Table/AdminAdminJob";
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';

let tasks = null;
class AdminJob extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
    const url = APIData.api+"courses/admin";
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="adminJobs">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<AdminAdminJob data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default AdminJob;