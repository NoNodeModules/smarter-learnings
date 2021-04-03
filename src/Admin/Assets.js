import React, { Component } from 'react';
import Loading from '../Loading';
import AdminAssetsData from '../Table/AdminAssetsData';
import {APIData} from '../Authentication/APIData';
class Assets extends Component {
  state={
      loading: true,
      Assets: null
  };
 async componentDidMount(){
  const url = APIData.api+"assets/";
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({Assets: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="assets">

              {this.state.loading || !this.state.Assets ? <Loading />: 
              <p>
    <div className="carrybox">
     <AdminAssetsData data={this.state.Assets}/> 
    </div>
              </p>}
         
  </div>
  );
  }
 }
export default Assets;