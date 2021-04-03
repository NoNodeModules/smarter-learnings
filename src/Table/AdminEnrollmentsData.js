import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination
} from "react-crud-table";
import UPDATE from 'react-crud-table';
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure()

// Component's Base CSS
//import "./index.css";
console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
}

function Acceptapplication(AdminEnrollmentsRow){
    console.log(AdminEnrollmentsRow);
axios
      .post('http://103.142.165.146:8080/smarter-learnings/enrollments/', AdminEnrollmentsRow )
      .then(response => {
        if(response.data.status =="Success"){
          console.log(response);
            window.location.reload("/");
        }
        else{
          toast('Update Failed')
        }
      })
      .catch(error => {
          console.log(error);
        toast('Update Failed')
      })
}


const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "user_email") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "enrollment_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "enrollment_status"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_id"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "user_name"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "admin_id"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "followup_datetime" || data.field === "enrolled_date"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }

  return sorter;
};

// let count = tasks.length;
// console.log(count);
const service = {
  fetchItems: payload => {
    const { activePage, itemsPerPage } = payload.pagination;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result.slice(start, end));
  },
  fetchTotal: payload => {
    return Promise.resolve(tasks.length);
  },
  create: task => {
    tasks.push({
     });
     Acceptapplication(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.user_email === data.user_email);
    task.user_email = data.user_email;
    task.enrollment_type = data.enrollment_type;
    task.enrollment_status = data.enrollment_status;
    task.course_id = data.course_id;
    task.user_phone_number = data.user_phone_number;
    task.user_name = data.user_name;
    task.admin_id = sessiondetails.user;
    task.followup_datetime = data.followup_datetime;
    task.enrolled_date = data.enrolled_date;
    Acceptapplication(task);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Coursetest = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="Enrollments"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="user_email" label="User Email" placeholder="User Email" readOnly />
        <Field name="enrollment_type" label="Enrollment Type" placeholder="Enrollment Type" readOnly />
        <Field name="enrollment_status" label="Enrollment Status" placeholder="Enrollment Status" />
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly/>
        <Field name="user_phone_number" label="User Phone Number" placeholder="User Phone Number" readOnly />
        <Field name="user_name" label="User Name" placeholder="User Name" readOnly />
        <Field name="admin_id" label="Admin ID" placeholder="Admin ID" hideInUpdateForm />
        <Field name="followup_datetime" label="Follow Up date" placeholder="Follow Up date Time" type ="date" />
        <Field name="enrolled_date" label="Enrolled Date" placeholder="Enrolled Date" type="date"/>
      </Fields>
      <UpdateForm
        title="Course Update Process"
        message="Update Course"
        trigger= "Update"
        onSubmit={task => service.update(task)}
        submitText="Acpect"
        validate={values => {
          const errors = {};
          if (!values.followup_datetime) {
            errors.followup_datetime = "Please, provide Follow Up Date and Time";
          }
          if (!values.enrolled_date) {
            errors.enrolled_date = "Please, provide Follow Up Date and Time";
          }
          if (values.enrollment_status !== "accepted" && values.enrollment_status !== "completed" && values.enrollment_status !== "applied") {
            errors.enrollment_status = "Select  'accepted'  or  'completed'  or  'applied'";
          }

          return errors;
        }}
      />
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>

)


class AdminEnrollmentsData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Coursetest/> 
      </div>
      );
    }
  }
   
  export default AdminEnrollmentsData;