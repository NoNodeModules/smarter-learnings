import React,{Component} from 'react';
import StudentNavbar from './Navigation/StudentNavbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudentProfile from './Student/StudentProfile'
import ChangePassword from './Authentication/ChangePassword';
import StudentMarksAPI from './Student/StudentMarksAPI'
import StudentTimeTableAPI from './Student/StudentTimeTableAPI';
import StudentDocumentsAPI from './Student/StudentDocuments';
class StudentApp  extends Component{
  render() { 
    return (  
    <Router className="studentConsole">
    <StudentNavbar />
    <Switch>
    <Route path='/' exact  component = {StudentProfile} />
    <Route path='/changepassword' exact  component = {ChangePassword} />
    <Route path='/studentMarksAPI' exact  component = {StudentMarksAPI} />
    <Route path='/studentTimeTableAPI' exact  component = {StudentTimeTableAPI} />
    <Route path='/studentDocumentsAPI' exact  component = {StudentDocumentsAPI} />
    <StudentTimeTableAPI />

    
    
    </Switch>
    </Router>
    );
  }
}
export default StudentApp;