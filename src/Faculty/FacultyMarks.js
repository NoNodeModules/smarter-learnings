import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import FacultyMarksData from "../Table/FacultyMarksData"
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
let tasks = null;
class FacultyMarks extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+'marks/';
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 
  render() { 
    return ( 
      <div className="facultyMarks">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<FacultyMarksData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default FacultyMarks;