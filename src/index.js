import React from 'react';
import ReactDOM from 'react-dom';   
import AdminApp from './AdminApp';
import UserApp from './UserApp';
import App from './App';
import StudentApp from './StudentApp';
import FacultyApp from './FacultyApp'

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
let usertype = "externaluser";
if (sessiondetails == null ){}
else
{
    usertype = sessiondetails;
}
if(usertype.userType==="Admin")
    {
        ReactDOM.render(<AdminApp />, document.getElementById('root'));    

    }
else if(usertype.userType==="Student"){
        ReactDOM.render(<StudentApp />, document.getElementById('root'));
}
else if(usertype.userType==="Employee"){
    ReactDOM.render(<FacultyApp />, document.getElementById('root'));
}
else if(usertype.userType==="user"){
    ReactDOM.render(<UserApp />, document.getElementById('root'));
}

else if(usertype==="externaluser")
{
    ReactDOM.render(<AdminApp />, document.getElementById('root')); 
} 