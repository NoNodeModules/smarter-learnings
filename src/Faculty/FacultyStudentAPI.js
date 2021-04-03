import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import FacultyStudentsData from "../Table/FacultyStudentsData";
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
let tasks = null;
class FacultyStudentAPI extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+'students/';
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyStudentAPI">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<FacultyStudentsData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default FacultyStudentAPI;