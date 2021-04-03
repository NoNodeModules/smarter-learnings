import React,{Component} from 'react';
import AdminNavbar from './Navigation/AdminNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Faculty from './Admin/Faculty';
import Students from './Admin/Students';
import Enquiries from './Admin/Enquiries';
import Courses from './Admin/Courses';
import User from './Admin/User';
import Admin from './Admin/Admin';
import TimeTable from './Admin/TimeTable';
import AddCourses from './Admin/AddComponents/AddCourses';
import Assets from './Admin/Assets';
import AdminEnrollments from './Admin/AdminEnrollments';
import Graph from './Admin/Graph';
import AdminMarks from './Admin/AdminMarks';
import EnrollmentsAccepted from './Admin/EnrollmentsAccepted';
import EnrollmentsApplied from './Admin/EnrollmentsApplied';
import EnrollmentsCompleted from './Admin/EnrollmentsCompleted';
import AdminChangePassword from './Admin/AdminChangePassword';
import UploadSingle from './Upload/UploadSingle';

import AdminDocumentsAPI from './Admin/AdminDocumentsAPI';
import AdminOfficeDocumentAPI from './Admin/AdminOfficeDocumentAPI';
import AdminJob from './Admin/AdminJob';
import FacultyJobs from './Admin/FacultyJobs';
import CreateAssets from './Admin/AddComponents/CreateAssets'
import MembersStatus from './Admin/MembersStatus';
import AdminCourseEnrolled from './Admin/AdminCoursesEnrolled'
import Invoice from './Admin/Invoice'
function printPage() {
  document.getElementById("print").style.visibility = "hidden";
  document.getElementById("navbar").style.visibility = "hidden";
  window.print();
  window.location.reload();
}
class AdminApp extends Component {
  render() { 
    
    return ( 
      <Router className="AdminConsole"> 
      <AdminNavbar />
      <Switch>
    <Route path='/' exact component = {Students} />
     <Route path='/faculty'   component = {Faculty} />
     <Route path='/courses' component = {Courses} />
     <Route path='/user' component = {User} />
     <Route path='/admins' component = {Admin} />
     <Route path='/timetable' component = {TimeTable} />
     <Route path='/addcourses' component = {AddCourses} />
     <Route path='/assets' component = {Assets} />
     <Route path='/adminenrollments' component = {AdminEnrollments} />
     <Route path='/graph' component = {Graph} />
     <Route path='/marks' component = {AdminMarks} />
     <Route path='/enrollmentsAccepted' component = {EnrollmentsAccepted} />
     <Route path='/enrollmentsApplied' component = {EnrollmentsApplied} />
     <Route path='/enrollmentsCompleted' component = {EnrollmentsCompleted} />
     <Route path='/adminChangePassword' component = {AdminChangePassword} />
     <Route path='/adminofficeDocumentsAPI' component = {AdminOfficeDocumentAPI} />
     <Route path='/adminDocumentsAPI' component = {AdminDocumentsAPI} />
     <Route path='/uploadsingle' component = {UploadSingle} />
     <Route path='/adminJobs' component = {AdminJob} />
     <Route path='/facultyJobs' component = {FacultyJobs} />
     <Route path='/addcourses' component = {AddCourses} />
     <Route path='/createassets' component = {CreateAssets} />
     <Route path='/membersStatus' component = {MembersStatus} />
     <Route path='/adminCourseEnrolled' component = {AdminCourseEnrolled} />
     <Route path='/invoice' component = {Invoice} />
     <Students />
      </Switch>
    </Router>
     );
  }
}
 
export default AdminApp;
