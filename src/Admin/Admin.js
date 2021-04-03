import React from "react";
import "../CRUDTable.css";
import {APIData} from '../Authentication/APIData';
import { Component } from "react";
import AdminData from "../Table/AdminData";
import Loading from "../Loading";

let tasks = null;
class Admin extends Component {
   state={
    loading: true,
    admins:null
};
async componentDidMount(){
    const url = APIData.api+'admins/';
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({admins: daata,loading:false});
} 


  render() { 
    return ( 
  
    
      <div className="admins">
     
                {this.state.loading || !this.state.admins ? <Loading /> : 
                <p>
      <div className="carrybox">
      <AdminData data={this.state.admins} />
      </div>
                </p>}
            
    </div>
    );
    }
   }
        
export default Admin;