import React,{Component} from 'react';
import Navbar from './Navigation/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeUser from './User/HomeUser';
import AboutUser from './User/AboutUser';
import ContactUser from './User/ContactUser';
import QueriesUser from './User/QueriesUser';
import UserCourse from './User/UserCourse';
import UserJob from './User/UserJobs';

class UserApp  extends Component {
 
  render() { 
  
    return (  
      <Router className="userapp">
      <Navbar />
      <Switch>
      <Route path='/' exact  component = {HomeUser} />
     <Route path='/about'   component = {AboutUser} />
     <Route path='/contact' component = {ContactUser} />
     <Route path='/queries' component = {QueriesUser} />
     <Route path='/usercourses' component = {UserCourse} /> 
     <Route path='/userjob' component = {UserJob} />
     
      </Switch>
    </Router>
    );
  }
}

export default UserApp;