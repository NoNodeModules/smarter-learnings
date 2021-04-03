import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from '../src/Authentication/SignUp';
import ContactUser from './ContactUser';
import SignIn from './Authentication/SignIn';
import AdminSignin from './Authentication/AdminSignin';
import AdminApp from './AdminApp';
import HomePage from './HomePage';
import UserApp from './UserApp'
import ForgotPassword from './Authentication/ForgotPassword';
import StudentApp from './StudentApp';



class App  extends Component {
 
  render() { 
    return (  
      <Router>
      <Switch>
      <Route path='/' exact  component = {HomePage} />
     <Route path='/signin' component = {SignIn} />
     <Route path='/signup' component = {SignUp} />
     <Route path='/adminsignin' component = {AdminSignin} />
     <Route path='/AdminConsole' component = {AdminApp} />
     <Route path='/userapp' component = {UserApp} />
     <Route path='/homepage' component = {HomePage} />
     <Route path='/contact' component = {ContactUser} />
     <Route path='/forgotpassword' component = {ForgotPassword} />
     <Route path='/studentConsole' component = {StudentApp} />

      </Switch>
    </Router>
    );
  }
}

export default App;