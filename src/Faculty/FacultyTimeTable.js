import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import FacultyTimeTableData from "../Table/FacultyTimeTableData"
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
let tasks = null;
class FacultyTimeTable extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+'timetable/"';
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyTimeTable">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<FacultyTimeTableData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default FacultyTimeTable;