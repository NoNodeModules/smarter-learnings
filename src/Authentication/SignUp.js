    import React, {Component, useState} from 'react'
    import { Link } from 'react-router-dom';
    import * as AiIcons from "react-icons/ai";
    import axios from 'axios';
    import {toast} from 'react-toastify'; 
    import 'react-toastify/dist/ReactToastify.css';
    import {APIData} from './APIData';

    toast.configure();
    const initialState = {

    }

    class SignUp extends Component {
        constructor(props) {
            super(props)

            this.state = {
                user_name: '',
                user_email: '',
                userEmailError: '',
                userNameError: '',
                user_password: '',
                userPasswordError: '',
                user_phone_number:'',
                user_phone_number_error:'',
                confirm_password:''
            };
        }

            validation = () =>{
            let   userEmailError = '';
            let  userNameError = '';
            let user_phone_number_error = '';
            
            if(!this.state.user_name){
                userNameError = "Invalid Name";
            }

            if(!this.state.user_email.includes('@')){
                userEmailError="Invalid Email!";
            }
            if(!this.state.user_phone_number){
                user_phone_number_error = "Invalid Phone Number";
            }
           
        
            if(userEmailError || userNameError || user_phone_number_error ){
                this.setState({userEmailError , userNameError, user_phone_number_error});
                return false;
            }
                return true;
            
            
            }

//             admin marks data
//             marks api
// copy to students 
//            $
//             apl

//             copy past on students marks , timetable & files
            

            handleChange = event => {
                
                const isCheckbox = event.target.type === "checkbox";
                this.setState({
                [event.target.userEmailError]: isCheckbox
                    ? event.target.checked
                    : event.target.value
                });
            };
        

        changeHandler = e => {
            this.setState({ [e.target.name]: e.target.value })
        }

        submitHandler = e => {
            e.preventDefault()
            
        
            if (this.state.user_password !== this.state.confirm_password) {
                toast('Passwords does not match',{position: toast.POSITION.TOP_RIGHT});
            } else {
                var sendstate = {
                    user_name: this.state.user_name,
                    user_email: this.state.user_email,
                    user_password: this.state.user_password,
                    user_phone_number:this.state.user_phone_number
                }
                console.log(this.sendstate)
                axios
                .post(APIData.api+'users/', this.state,{headers:APIData.headers})
                .then(response => {
                    console.log(response)
                    toast(response);
                    const url = new URL(APIData.url);
                    window.location.href = url;
                })
                .catch(error => {
                    toast("registration failed");
                    console.log(error)
                })
            }
            const isValide = this.validation();

            if (isValide){
                this.setState(initialState)
            }
            if(this.state.user_phone_number.length != 10 && this.state.user_phone_number.length != 12){
                
                        toast('Please enter a valid phone number',{position: toast.POSITION.TOP_RIGHT});
            }

        }
        render() { 
        
            return (
                <form className="signup" onSubmit={this.submitHandler}>    

                <div className="carrybox">
                <Link to="homepage">
                    <AiIcons.AiFillCloseCircle  />
                    </Link>
                    <div className="card-header">
            <h3 className="heading01">Sign Up</h3>
            <div  className="bringitcenter">
            <img className="profile_img" src="https://i.ibb.co/b2gNzNp/logo.png" alt />
            </div >
            </div>
            <div className="floatleft">
        <div className="">
                <label className="heading02" htmlFor="Name">Name:</label><br/>
                <input
                placeholder="Name" 
                className="inputfield"

                type="text" 
                name="user_name"
                value={this.state.user_name}
                onChange={this.changeHandler}
                />
                {this.state.userNameError ? (<div style={{color:'red' }}>
                    {this.state.userNameError}
                </div>)  : null}
                

            </div>


                <div className="">
                <label className="heading02" htmlFor="Email">Email:</label><br/>

                <input 
                placeholder="Email" 
                className="inputfield"
                
                type="email" 
                name="user_email"
                value={this.state.user_email}
                onChange={this.changeHandler}
                
                
                />
    {this.state.userEmailError ? (<div style={{color:'red' }}>
                    {this.state.userEmailError}
                </div>)  : null}
            </div>
            <div className="">
                <label className="heading02" htmlFor="Phone Number">Phone Number:</label><br/>

                <input 
                placeholder="Phone Number" 
                className="inputfield" 
                
                type="number" 
                name="user_phone_number"
                value={this.state.user_phone_number}
                onChange={this.changeHandler} 
                
                />
                {this.state.user_phone_number_error ? (<div style={{color:'red' }}>
                    {this.state.user_phone_number_error}
                </div>)  : null}

                </div>

            </div>

            <div className="floatright">

            
        
            <div className="">
                <label className="heading02" htmlFor="email">Password:</label><br/>
                <input
                placeholder="Password" 
                className="inputfield" 

                type="password"
                name="user_password"
                value={this.state.user_password}
                onChange={this.changeHandler} 
                
                
                />

                </div>
                <div className="">
                <label className="heading02" htmlFor="Confirm Password">Confirm Password</label><br/>
                <input
                placeholder="Confirm Password" 
                className="inputfield" 

                type="password"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.changeHandler} 
                
                
                />
                </div>
                <div  className="" >
                {this.handleSubmit}
                </div>
                </div>
                <div className="submitcarry">
        <button className="Submitbutton" type="submit" >Sign Up</button>
        </div>
        <div className="floatleft">
             <Link to="/forgotpassword"><p className="forgotpasstest">Forgot Password?</p></Link>
            </div>
            <div className="floatright">
             <Link to="/signin"><p className="donthaveanaccount">Already Have An Account?</p></Link>
            </div>
                </div>
            </form>
            
            );
        }
    }
    
export default  SignUp;

