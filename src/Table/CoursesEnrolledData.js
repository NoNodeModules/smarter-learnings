import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
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
  // console.log(tasks);
}

// function Postcourse(AdminCoursesRow){
// axios
//       .post('http://103.142.165.146:8080/smarter-learnings/courses-enrolled', AdminCoursesRow )
//       .then(response => {
//         if(response.data.status =="Success"){
//           window.location.reload("/");
//         }
//         else{
//           toast('Update Failed')
//         }
//       })
//       .catch(error => {
//         toast('Update Failed')
//       })
// }

// function deletecourse(AdminCoursesRow){
//   console.log(AdminCoursesRow.course_id);
//   const url = 'http://103.142.165.146:8080/smarter-learnings/courses-enrolled' + AdminCoursesRow.course_id;
//   axios
//         .delete(url)
//         .then(response => {
//           if(response.status==200){
//             window.location.reload("/");
//            }
//            else{
//              toast('Delete Failed')
//            }
//         })
//         .catch(error => {
//           toast('Delete Failed')
//         })
//   }
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
  else if (data.field === "student_id"){
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
     //Postcourse(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => (t.course_id === data.course_id && t.student_id === data.student_id) );
    task.course_id = data.course_id;
    task.student_id = data.student_id;
    //Postcourse(task);
    return Promise.resolve(task);
  },
   delete: data => {
     const task = tasks.find(t => (t.course_id === data.course_id && t.student_id === data.student_id));
     //deletecourse(task);
     tasks = tasks.filter(t => t.course_id !== task.course_id);
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Enrolled = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="COURSES"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
      <Field name="id" label="ID" placeholder="ID" readOnly />
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly />
        <Field name="student_id" label="student ID " placeholder="student ID"  readOnly />
      </Fields>
      {/* <CreateForm
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

          if (!values.student_id) {
            errors.student_id = "Please, provide Course Description";
          }


          return errors;
        }}
      /> */}

      <UpdateForm
        title="View Student Course"
        message="Details"
        trigger= "View"
        onSubmit={task => service.update(task)}
        submitText="Cancel"
        validate={values => {
          const errors = {};

          if (!values.course_id) {
            errors.course_id = "Please, provide Course ID";
          }

          if (!values.student_id) {
            errors.student_id = "Please, provide Course Description";
          }


          return errors;
        }}
      />
      {/* <DeleteForm
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

          if (!values.student_id) {
            errors.student_id = "Please, provide Course Description";
          }
          return errors;
        }}
      /> */}
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>

)


class CourseEnrolledData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Enrolled/> 
      </div>
      );
    }
  }
   
  export default CourseEnrolledData;
