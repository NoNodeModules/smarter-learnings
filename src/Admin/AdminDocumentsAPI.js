import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import AdminDocumentsData from "../Table/AdminDocumentsData";
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';

let tasks = null;
class AdminDocumentsAPI extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
    const url = APIData.api+"file/";
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="adminDocumentsAPI">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<AdminDocumentsData data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default AdminDocumentsAPI;
