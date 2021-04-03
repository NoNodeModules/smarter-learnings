import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import UserApp from '../UserApp';
import * as AiIcons from "react-icons/ai";
import {APIData} from './APIData';
var mergeJSON = require("merge-json") ;
toast.configure()

class  Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_email: '',
            user_password: ''
        }
    }
    
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        
    }
    
    userexits (data) {
        var type = {userType:"user"};
        var storedata =  mergeJSON.merge(type,data) ;
        localStorage.setItem("sessiondetails",JSON.stringify(storedata));
        // ReactDOM.render(<UserApp />, document.getElementById('root'));  
        window.location.reload(); 
    }
    usernotexits = e => {
        //alert("Wrong Username or Password")
        toast('Wrong Username or Password',{position: toast.POSITION.TOP_RIGHT})
    }
    
    submitHandler = e => {
        e.preventDefault()
        axios
            .post(APIData.api+'users/user/login', this.state,{headers:APIData.headers})
            .then(response => {
                { if(response.data.status == "Success")  
                this.userexits(response.data) 
                else
                this.usernotexits()  
            }
        })
            .catch(error => {
                toast("It's Time To Grab A Coffee")
                console.log(error)
            })
    }

    
    render() { 
        const {user_email, user_password, } = this.state
        return ( 
            <form className="signin" onSubmit={this.submitHandler}>
                
                <div className="carrybox">
                <Link to="homepage">
                  <AiIcons.AiFillCloseCircle  />
                  </Link>
                  <div className="card-header">
            <h3 className="heading01">Sign In</h3>
            <div  className="bringitcenter">
            <img className="profile_img" src="https://i.ibb.co/b2gNzNp/logo.png" alt />
            </div >
            </div>
            
               <div className="carrybox">
                <label className="heading02" htmlFor="name">Email:</label><br/>
                <input 
                placeholder="Email" 
                className="inputfield" 

                type="email" 
                name="user_email"
                value={user_email}
                onChange={this.changeHandler} 
                
                />

                <label className="heading02" htmlFor="email">Password:</label><br/>
                <input 
                placeholder="Password" 
                className="inputfield" 

                type="password"
                name="user_password"
                value={user_password}
                onChange={this.changeHandler}  
                
                />
                </div>
    
                 <Link to="/studentConsole">
                 <button className="Submitbutton" type="submit" onClick = {this.submitHandler}  >Sign In</button>

                 </Link>
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
 
export default Signin;