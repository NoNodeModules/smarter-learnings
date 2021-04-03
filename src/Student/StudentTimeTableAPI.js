import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import StudentTimeTableData from "../Table/StudentTimeTableData"
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
let tasks = null;
class StudentTimeTableAPI extends Component {
   state={
    loading: true,
    Timetable:null
};
async componentDidMount(){
  const url = APIData.api+'timetable/';
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({Timetable: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="studentTimeTableAPI">
      {this.state.loading || !this.state.Timetable? <Loading />: 
        <p>
<div className="carrybox">
<StudentTimeTableData data={this.state.Timetable}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default StudentTimeTableAPI;