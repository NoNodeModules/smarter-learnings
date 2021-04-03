import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as AiIcons from "react-icons/ai";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import {APIData} from './APIData';
toast.configure()


class  AdminSignin extends Component {
    constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
    
  userexits (data) {
    console.log(data)
    localStorage.setItem("sessiondetails",JSON.stringify(data))
    window.location.reload(); 
  }

    usernotexits = e => {
        toast('Wrong Username or Password',{position: toast.POSITION.TOP_RIGHT})
    }
    
  submitHandler = e => {
    e.preventDefault()
    
    axios
      .post(APIData.api+'login-type/', this.state,{headers:APIData.headers})
      .then(response => {
                console.log(response.data.status)
                { if(response.data.status == "Success")  
                this.userexits(response.data) 
                else
                this.usernotexits()  
            }
        
    })
      .catch(error => {
        toast("It's Time TO Grab A Coffee");
        console.log(error)
      })
  }
    
    render() { 
        const {username, password, } = this.state
        return ( 
            <form className="adminsignin" >
                
                <div className="carrybox">
                  <Link to="homepage">
                  <AiIcons.AiFillCloseCircle  />
                  </Link>
        <div className="card-header">
            <h3 className="heading01">Institutional Sign In</h3>
            <div  className="bringitcenter">
            <img className="profile_img" src="https://i.ibb.co/b2gNzNp/logo.png" alt />
            </div >
            </div>
               <div className="carrybox">
                <label className="heading02" htmlFor="name">Username:</label><br/>
                <input 
                placeholder="Username" 
                className="inputfield" 
                type="text" 
                name="username"
                value={username}
                onChange={this.changeHandler} 
                
                />
                <label className="heading02" htmlFor="Password">Password:</label><br/>
                <input 
                placeholder="Password" 
                className="inputfield" 
                type="password"
                name="password"
                value={password}
                onChange={this.changeHandler}  
                />
                </div>
             <div className="submitcarry">
                <button className="Submitbutton" type="submit" onClick = {this.submitHandler}  >Sign In</button>
             </div>
             <div className="floatleft">
             <Link to="/forgotpassword"><p className="forgotpasstest">Forgot Password?</p></Link>
            </div>
            <div className="floatright">
             <Link to="/signup"><p className="donthaveanaccount">Don't Have An Account?</p></Link>
            </div>
            </div>
            </form>
         );
    }
}
 
export default AdminSignin;