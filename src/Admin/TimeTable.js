import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import AdminTimeTableData from "../Table/AdminTimeTableData"
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
let tasks = null;
class TimeTable extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+"timetable/";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="timetable">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<AdminTimeTableData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default TimeTable;