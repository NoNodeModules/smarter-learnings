import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import * as AiIcons from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination
} from "react-crud-table";

toast.configure()

// Component's Base CSS
//import "./index.css";
const DescriptionRenderer = ({ field }) => <textarea {...field} />;
console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  console.log(tasks);
}

function Postcourse(AdminCoursesRow){
axios
      .post('http://103.142.165.146:8080/smarter-learnings/courses/', AdminCoursesRow )
      .then(response => {
        if(response.data.status =="Success"){
          window.location.reload("/");
        }
        else{
          toast(response.data.status)
        }
      })
      .catch(error => {
        toast("It's Time To grab a coffee")
        window.location.reload()
      })
}

function deletecourse(AdminCoursesRow){
  console.log(AdminCoursesRow.course_id);
  const url = 'http://103.142.165.146:8080/smarter-learnings/courses/' + AdminCoursesRow.course_id;
  axios
        .delete(url)
        .then(response => {
          if(response.status==200){
            window.location.reload("/");
           }
           else{
             toast('Delete Failed')
           }
        })
        .catch(error => {
          toast('Delete Failed')
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
  else if (data.field === "admin_id"){
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
     Postcourse(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.course_id === data.course_id);
    task.course_id = data.course_id;
    task.course_description = data.course_description;
    task.course_type = data.course_type;
    task.course_sub_type = data.course_sub_type;
    task.course_fees = data.course_fees;
    task.course_duration = data.course_duration;
    task.admin_id = data.admin_id;
    Postcourse(task);
    return Promise.resolve(task);
  },
   delete: data => {
     const task = tasks.find(t => t.course_id === data.course_id);
     deletecourse(task);
     tasks = tasks.filter(t => t.course_id !== task.course_id);
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Coursetest = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="Faculty Job"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="course_id" label="Course ID" placeholder="Course ID" />
        <Field name="course_description" label="Course Description" placeholder="Course Description" render={DescriptionRenderer} />
        <Field name="course_type" label="Course Type" placeholder="Course Type" />
        <Field name="course_sub_type" label="Course Sub Type" placeholder="Course Sub Type" />
        <Field name="course_fees" label="Faculty Salary" placeholder="Faculty Salary" />
        <Field name="course_duration" label="Faculty Tenure" placeholder="Faculty Tenure" />
        <Field name="admin_id" label="Admin ID" placeholder="Admin ID" />
      </Fields>
      <CreateForm
        title="Course Creation"
        message="Create a new Course!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
              if (!values.course_id) {
            errors.course_id = "Please, provide Course ID";
          }

          if (!values.course_description) {
            errors.course_description = "Please, provide Course Description";
          }

          if (values.course_type !== "course-academics" && values.course_type !== "course-professional" && values.course_type !== "job" && values.course_type !== "admin") {
            errors.course_type = "Please enter course-academics ";
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
          if (!values.admin_id) {
            errors.admin_id = "Please, provide Admin ID";
          }


          return errors;
        }}
      />

      <UpdateForm
        title="Course Update Process"
        message="Update Course"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
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
          if (!values.admin_id) {
            errors.admin_id = "Please, provide Admin ID";
          }


          return errors;
        }}
      />
      <DeleteForm
        title="Course Delete Process"
        message="Are you sure you want to delete the Course?"
        trigger={<AiIcons.AiFillDelete />}
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
              if (!values.course_id) {
            errors.course_id = "Please, provide Course ID";
          }

          if (!values.course_description) {
            errors.course_id = "Please, provide Course Description";
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
          if (!values.admin_id) {
            errors.admin_id = "Please, provide Admin ID";
          }

          return errors;
        }}
      />
      <Pagination
        itemsPerPage={10}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>

)


class AdminfacultyJobData extends Component {
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
   
  export default AdminfacultyJobData;