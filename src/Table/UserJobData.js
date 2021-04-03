import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  UpdateForm,
  Pagination
} from "react-crud-table";

toast.configure()

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

var today = new Date(),
datetime = today.getDate() +'-' + (today.getMonth() + 1) + '-' + today.getFullYear()
const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
}

function Apply(Usercourserow){
var Applydata = {
            user_email: sessiondetails.email,
            user_name: sessiondetails.user,
            user_phone_number: sessiondetails.phoneNumber,
            enrollment_type: "employee",
            enrollment_status: "applied",
            course_id: Usercourserow.course_id,
            admin_id: "sathya",
            followup_datetime: datetime
}
axios
      .post('http://103.142.165.146:8080/smarter-learnings/enrollments/', Applydata )
      .then(response => {
        console.log(response)
         if(response.data.status =="Success"){
           toast(response.data.Description);
         }
         else{
           toast('Update Failed')
         }
      })
      .catch(error => {
        console.log(error);
        toast('Its Time to Grab a Coffee')
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

  if (data.field === "course_id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "course_description"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_sub_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_duration"){
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
  Applycourse: data => {
    const task = tasks.find(t => t.course_id === data.course_id);
    Apply(task);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Job = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="COURSES"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly />
        <Field name="course_description" label="Course Description" placeholder="Course Description"  hideInUpdateForm render={DescriptionRenderer} readOnly />
        <Field name="course_type" label="Course Type" placeholder="Course Type" readOnly />
        <Field name="course_sub_type" label="Course Sub Type" placeholder="Course Sub Type" readOnly />
        <Field name="course_fees" label="Course Fees" placeholder="Course Fees" readOnly />
        <Field name="course_duration" label="Course Duration" placeholder="Course Duration" readOnly />
      </Fields>
      
      <UpdateForm
        title="Course Apply Process"
        message="Apply"
        onSubmit={task => service.Applycourse(task)}
        trigger = "Apply"
        submitText="Apply"
        validate={values => {
          const errors = {};

          if (!values.course_id) {
            errors.course_id = "Please, provide Course ID";
          }

          if (!values.course_description) {
            errors.course_description = "Please, provide Course Description";
          }

          if (!values.course_type) {
            errors.course_type = "Please, provide Course Type";
          }

          if (!values.course_sub_type) {
            errors.course_sub_type = "Please, provide Course SubType";
          }
          if (!values.course_fees) {
            errors.course_fees = "Please, provide Course Fees";
          }
          if (!values.course_duration) {
            errors.course_duration = "Please, provide Course Duration";
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


class UserJobData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Job/> 
      </div>
      );
    }
  }
   
  export default UserJobData;