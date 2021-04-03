import React, { Component } from 'react';
import Loading from '../Loading';
import AdminEnrollmentsData from '../Table/AdminEnrollmentsData';
import {APIData} from '../Authentication/APIData';
class EnrollmentsAccepted extends Component {
  state={
      loading: true,
      enrolldata: null
  };
 async componentDidMount(){
      const url = APIData.api+"enrollments/status/accepted";
      const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({enrolldata: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="enrollmentsAccepted">
    <div className="admins">
    <main className="wrapper">

      <section className="hero">
        <h1>Smarter Learning's</h1>
        <article>
          <p>Welcome</p>
          <a href="#webpage">Contact Us</a>
        </article>
      </section>
      <section className="webpage" id="webpage">
        <ul>
          <li>
          <div>
            <h3  className="heading01">Applications</h3>
            </div>
            <figure>
              <div>  
          </div>
        </figure>
              {this.state.loading || !this.state.enrolldata ? <Loading /> : 
              <p>
    <div className="carrybox">
    <AdminEnrollmentsData data={this.state.enrolldata}/> 
    </div>
              </p>}
            <a href="#">Next</a>
          </li>
        </ul>
      </section>
      </main>
    </div>
    <footer>
      <p>Contact Us For More Information</p>
    </footer>
  </div>
  );
  }
 }
export default EnrollmentsAccepted;