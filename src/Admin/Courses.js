import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import AdminCourseData from "../Table/AdminCourseData"
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
let tasks = null;
class Course extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+"courses/";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="courses">
        <div className="carrybox">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<AdminCourseData data={this.state.user}/>
</div>
        </p>}
        </div>
        </div>
    );
  }
}
 
export default Course;