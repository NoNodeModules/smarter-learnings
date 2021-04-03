import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FacultyProfile from './Faculty/FacultyProfile';
import FacultyNavbar from './Navigation/FacultyNavbar';
import ChangePassword from './Authentication/ChangePassword';
import FacultyMarks from './Faculty/FacultyMarks';
import Facultydocuments from './Faculty/Facultydocuments';
import FacultyTimeTableData from './Faculty/FacultyTimeTable';
import FacultyAdminJob from './Faculty/FacultyAdminJob';
import FacultyStudentAPI from './Faculty/FacultyStudentAPI';
import FacultyCourseEnrolled from './Faculty/FacultyCourseEnrolled'



class FacultyApp  extends Component{
  render() { 
    return (  
    <Router className="facultyConsole">
    <FacultyNavbar />
    <Switch>
    <Route path='/' exact  component = {FacultyProfile} />
    <Route path='/changePassword' exact  component = {ChangePassword} />
    <Route path='/facultyMarks' exact  component = {FacultyMarks} />
    <Route path='/facultydocuments' component = {Facultydocuments} />
    <Route path='/facultyTimeTable' component = {FacultyTimeTableData} />
    <Route path='/facultyadminjob' component = {FacultyAdminJob} />
    <Route path='/facultyStudentAPI' component = {FacultyStudentAPI} />
    <Route path='/facultyCourseEnrolled' component = {FacultyCourseEnrolled} />

<FacultyTimeTableData />




    
    </Switch>
    </Router>
    );
  }
}
export default FacultyApp;