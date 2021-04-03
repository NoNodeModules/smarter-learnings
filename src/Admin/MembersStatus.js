import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import StatusPage from "../Table/StatusPage";
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
let tasks = null;
class MembersStatus extends Component {
   state={
    loading: true,
    admins:null
};
async componentDidMount(){
  const url = APIData.api+"login-type/users/";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({admins: daata,loading:false});
} 


  render() { 
    return ( 
  
      <div className = "membersStatus">
      <div className="">
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
              <h3  className="heading01">Admins</h3>
              </div>
              <figure>
                <div>  
            </div>
          </figure>
                {this.state.loading || !this.state.admins ? <Loading />: 
                <p>
      <div className="carrybox">
      <StatusPage data={this.state.admins} />
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
        
export default MembersStatus;