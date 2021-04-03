import React, { Component } from 'react';
import Loading from '../Loading';
import AdminEnrollmentsData from '../Table/AdminEnrollmentsData';
import {APIData} from '../Authentication/APIData';

class AdminEnrollments extends Component {
  state={
      loading: true,
      enrolldata: null
  };
 async componentDidMount(){
      const url = APIData.api+"enrollments/";
      const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({enrolldata: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="adminenrollments">

              {this.state.loading || !this.state.enrolldata ? <Loading /> : 
              <p>
    <div className="carrybox">
    <AdminEnrollmentsData data={this.state.enrolldata}/> 
    </div>
              </p>}
            
  </div>
  );
  }
 }
export default AdminEnrollments;