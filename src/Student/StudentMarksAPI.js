import React from "react";
import { Component } from "react";
import StudentsMarksData from "../Table/StudentsMarksData";
import '../CRUDTable.css'
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
let tasks = null;
class StudentMarksAPI extends Component {
   state={
    loading: true,
    marks:null
};
async componentDidMount(){
  const url = APIData.api+'marks/student/'+sessiondetails.user;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({marks: daata,loading:false});
} 
  render() { 
    return ( 
      <div className="marks">
      {this.state.loading || !this.state.marks? <Loading /> : 
        <p>
<div className="carrybox">
<StudentsMarksData data={this.state.marks}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default StudentMarksAPI;