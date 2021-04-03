import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Userdata from "../Table/UserData"
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
let tasks = null;
class User extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+"users/";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div>
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<Userdata data={this.state.user}/>
</div>
        </p>}
        </div>
    );
  }
}
 
export default User;