import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import AdminMarksData from "../Table/AdminMarksData"
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';

let tasks = null;
class AdminMarks extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
    const url = APIData.api+"marks/";
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="marks">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<AdminMarksData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default AdminMarks;