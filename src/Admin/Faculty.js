import React, { Component } from 'react';
import Loading from '../Loading';
import AdminFacultyTableData from '../Table/AdminFacultyTableData';
import {APIData} from '../Authentication/APIData';
class Faculty extends Component {
  state={
      loading: true,
      person: null
  };
 async componentDidMount(){
  const url = APIData.api+"employee/";
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({person: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="faculty">
    <div className="carrybox">
      
    {this.state.loading || !this.state.person ? <Loading />: 
    <p>
    <div className="carrybox">
    <AdminFacultyTableData data={this.state.person}/>
    </div>
    </p>}     
    </div>
    
    </div>
  );
  }
 }
export default Faculty;