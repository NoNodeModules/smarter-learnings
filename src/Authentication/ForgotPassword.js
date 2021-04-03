import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";


class ForgotPassword extends Component {
   
    render() { 
     
        return (
            <form className="forgotpassword">    

            <div className="carrybox">
            <Link to="homepage">
                  <AiIcons.AiFillCloseCircle  />
                  </Link>
                  <div className="card-header">
            <h3 className="heading01">Forgot Password ?</h3>
            <div  className="bringitcenter">
            <img className="profile_img" src="https://i.ibb.co/b2gNzNp/logo.png" alt />
            </div >
            </div>

    <div className="carrybox">
            <label className="heading02" htmlFor="Email">Email:</label><br/>
            <input
            placeholder="Email" 
            className="inputfield"
            type="email" 
            />
            
</div>
{/* <div className="carrybox">
            <label className="heading02" htmlFor="Phone Number">Phone Number:</label><br/>
            <input
            placeholder="Phone Number" 
            className="inputfield"
            type="number" 
            />
            
</div> */}

         
            <div className="submitcarry">
      <button className="Submitbutton" type="submit" >Send Email
</button>

       </div>
       <div className="floatright">
             <Link to="/signin"><p className="donthaveanaccount">Sign In?</p></Link>
            </div>
            </div>
        </form>
        
          );
    }
}
 
export default  ForgotPassword;

