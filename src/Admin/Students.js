import React, { Component } from 'react';
import Loading from '../Loading';
// import Table from '../Table/table';
import AdminStudentsData from '../Table/AdminStudentsData '
import {APIData} from '../Authentication/APIData';
class Students extends Component {
  state={
      loading: true,
      Student: null
  };
 async componentDidMount(){
  const url = APIData.api+"students/";
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({Student: daata, loading: false});
  }       
  render() {
  return (
    <div>
    {this.state.loading || !this.state.Student? <Loading /> : 
      <p>
<div className="carrybox">
<AdminStudentsData data={this.state.Student}/>
</div>
      </p>}
      </div>
  );
  }
 }
export default Students;