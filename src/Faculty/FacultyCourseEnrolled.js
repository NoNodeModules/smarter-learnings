import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import CourseEnrolledData from "../Table/CoursesEnrolledData"
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
//(change directory)

let tasks = null;
class FacultyCourseEnrolled extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+'courses-enrolled/';
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyCourseEnrolled">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<CourseEnrolledData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default FacultyCourseEnrolled;