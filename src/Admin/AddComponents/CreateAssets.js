        
import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import axios from 'axios';
import {APIData} from '../../Authentication/APIData';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure();
const initialState = {

}

class CreateAssets extends Component {
constructor(props) {
super(props)

this.state = {
assets_id:"" ,
assets_id_error:'' ,

admin_id:sessiondetails.user ,
admin_id_error:'' ,

assets_cost:'', 
assets_cost_error:'', 

assets_name:'',
assets_name_error:'',

assets_purchased_date:'' ,
assets_purchased_date_error:'' ,

assets_count:'' ,
assets_count_error:'' ,

GST:'', 
GST_error:'', 

};
}

validation = () =>{
let   assets_id_error = '';
let  admin_id_error = '';
let  assets_cost_error = '';
let  assets_name_error = '';
let  assets_purchased_date_error = '';
let  assets_count_error = '';
let  GST_error = '';


if(!this.state.assets_id){
assets_id_error = "Invalid Asset ID";
}

if(!this.state.admin_id){
admin_id_error="Invalid Admin ID!";
}
if(!this.state.assets_cost){
assets_cost_error="Invalid Asset Cost!";
}
if(!this.state.assets_name){
assets_name_error="Invalid Asset Name!";
}
if(!this.state.assets_purchased_date){
assets_purchased_date_error="Invalid Assets Purchased Date!";
}
if(!this.state.assets_count){
assets_count_error="Invalid Asset Count!";
}
if(!this.state.GST){
GST_error="Invalid GST!";
}


if(admin_id_error || assets_id_error ||assets_cost_error||assets_cost_error||assets_name_error||assets_purchased_date_error||assets_count_error ||admin_id_error||GST_error){
this.setState({admin_id_error , assets_id_error ,assets_cost_error,assets_cost_error,assets_name_error,assets_purchased_date_error,assets_count_error ,admin_id_error,GST_error});
return false;
}
return true;


}


handleChange = event => {

const isCheckbox = event.target.type === "checkbox";
this.setState({
[event.target.admin_id_error]: isCheckbox
? event.target.checked
: event.target.value
});
};


changeHandler = e => {
this.setState({ [e.target.name]: e.target.value })
}

submitHandler = e => {
e.preventDefault()

var sendstate = {
admin_id: sessiondetails.user,
assets_cost : this.state.assets_cost,
assets_name : this.state.assets_id,
assets_purchased_date : this.state.assets_purchased_date,
assets_count : this.state.assets_count,
GST_error : this.state.GST_error
}
console.log(sendstate)
axios
.post(APIData.api+'assets/', sendstate,{headers:APIData.headers})
.then(response => {
toast(response);
//TO CHANGE URL
const url = new URL(APIData.url);
window.location.href = url;
})
.catch(error => {
toast("Asset Creation Failed");
console.log(error)
})


const isValide = this.validation();

if (isValide){
this.setState(initialState)
}

}


render() { 
const {confirm_password } = this.state

return (
<form className="createassets" onSubmit={this.submitHandler}>    

<div className="carrybox">
<Link to="homepage">
<AiIcons.AiFillCloseCircle  />
</Link>
<div className="card-header">
<h3 className="heading01">Add Assets</h3>
<div  className="bringitcenter">
<img className="profile_img" src="https://i.ibb.co/b2gNzNp/logo.png" alt />
</div >
</div>
<div className="floatleft">
<div className="">
<label className="heading02" htmlFor="assets_id">Asset ID:</label><br/>
<input
placeholder="Asset ID" 
className="inputfield"
type="text" 
name="assets_id"
value={this.state.assets_id}
/>
{this.state.assets_id_error ?(
<div style={{color:'red' }}>{this.state.assets_id_error}
</div>)  : null}


</div>
<div className="">
<label className="heading02" htmlFor="Admin ID:'' ">Admin ID</label><br/>

<input 
placeholder="Admin ID"
className="inputfield"
type="text" 
name="admin_id "
value={sessiondetails.user}
onChange={this.changeHandler}
/>
</div>
<div className="">
<label className="heading02" htmlFor="Asset Cost">Asset Cost:</label><br/>

<input 
placeholder="Asset Cost" 
className="inputfield" 

type="text" 
name="assets_cost"
value={this.state.assets_cost}
onChange={this.changeHandler} 

/>
{this.state.assets_cost_error ?(
<div style={{color:'red' }}>{this.state.assets_cost_error}
</div>)  : null}

</div>



</div>

<div className="floatright">



<div className="">
<label className="heading02" htmlFor="Asset Name">Asset Name:</label><br/>
<input
placeholder="Asset Name" 
className="inputfield" 

type="text"
name="assets_name"
value={this.state.assets_name}
onChange={this.changeHandler} 


/>
{this.state.assets_name_error ?(
<div style={{color:'red' }}>{this.state.assets_name_error}
</div>)  : null}

</div>
<div className="">
<label className="heading02" htmlFor="Asset Purchased Date">Asset Purchased Date</label><br/>
<input
placeholder="Asset Purchased Date" 
className="inputfield" 

type="date"
name="assets_purchased_date"
value={this.state.assets_purchased_date}
onChange={this.changeHandler} 


/>
{this.state.assets_purchased_date_error ?(
<div style={{color:'red' }}>{this.state.assets_purchased_date_error}
</div>)  : null}
</div>

<div className="">
<label className="heading02" htmlFor="Asset Count">Asset Count</label><br/>
<input
placeholder="Asset Count" 
className="inputfield" 

type="text"
name="assets_count"
value={this.state.assets_count}
onChange={this.changeHandler} 


/>
{this.state.assets_count_error ?(
<div style={{color:'red' }}>{this.state.assets_count_error}
</div>)  : null}
</div>

<div className="">
<label className="heading02" htmlFor="GST">GST</label><br/>
<input
placeholder="GST" 
className="inputfield" 

type="text"
name="GST"
value={this.state.GST}
onChange={this.changeHandler} 


/>
{this.state.GST_error ?(
<div style={{color:'red' }}>{this.state.GST_error}
</div>)  : null}
</div>

<div  className="" >
{this.handleSubmit}
</div>
</div>
<div className="submitcarry">
<button className="Submitbutton" type="submit" onChange={this.validation}  >ADD +</button>
</div>
</div>
</form>

);
}
}

export default  CreateAssets;