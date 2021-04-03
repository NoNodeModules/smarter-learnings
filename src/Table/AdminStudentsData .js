import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  DeleteForm,
  UpdateForm,
  Pagination
} from "react-crud-table";

toast.configure()

// Component's Base CSS
//import "./index.css";
const DescriptionRenderer = ({ field }) => <textarea {...field} />;
console.log();

function deletestudent(AdminStudentsRow){
    const url = 'http://103.142.165.146:8080/smarter-learnings/students/' + AdminStudentsRow.student_id;
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
          toast("It's Time To Grab A coffee")
        })
}

let tasks = [];

function getTask(testTask){
    console.log(testTask);
    tasks = testTask;
}

function PostUpdateStudent(AdminStudentsRow){
    console.log(AdminStudentsRow);
axios
      .post('http://103.142.165.146:8080/smarter-learnings/students/', AdminStudentsRow )
      .then(response => {
        window.location.reload();
      })
      .catch(error => {

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
  
    if (data.field === "student_id") {
      sorter =
        data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
    } 
    else if (data.field === "name"){
      sorter =
        data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
    }
    else if (data.field === "email"){
      sorter =
        data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
    }
    else if (data.field === "fathers_name"){
      sorter =
        data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
    }
    else if (data.field === "mother_name"){
      sorter =
        data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
    }
    else if (data.field === "address"){
        sorter =
          data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
      }
      else if (data.field === "gender"){
        sorter =
          data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
      }
      else if (data.field === "educational_qualification"){
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
     PostUpdateStudent(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.student_id === data.student_id);
    task.name = data.name;
    task.email = data.email;
    task.phone_number = data.phone_number;
    task.fathers_name = data.fathers_name;
    task.mother_name = data.mother_name;
    task.address = data.address;
    task.gender = data.gender;
    task.alt_number = data.alt_number;
    task.institution = data.institution;
    task.educational_qualification = data.educational_qualification;
    task.photo = data.photo;
    task.professional_exp = data.professional_exp;
    task.updated_date_time = data.updated_date_time;
    task.dob = data.dob;
    task.created_date_time = data.created_date_time;
    task.createdBy = data.createdBy;
    task.updatedBy = data.updatedBy;

    PostUpdateStudent(task);
    return Promise.resolve(task);
  },
  delete: data => {
     const task = tasks.find(t => t.student_id === data.student_id);
     deletestudent(task);
     tasks = tasks.filter(t => t.student_id !== task.student_id);
     return Promise.resolve(task);
   }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const StudentsTest = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="STUDENTS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="student_id" label="Student ID" placeholder="Student ID" readOnly/>
        <Field name="name" label="Name" placeholder="Name"  />
        <Field name="email" label="Email" placeholder="Email" />
        <Field name="phone_number" label="Phone Number" placeholder="Phone Number" />
        <Field name="fathers_name" label="Father's Name" placeholder="Father's Name" hideFromTable />
        <Field name="mother_name" label="Mother's Name" placeholder="Mother's Name" hideFromTable/>
        <Field name="address" label="Address" placeholder="Address" hideFromTable/>
        <Field name="gender" label="Gender" placeholder="Gender" />
        <Field name="dob" label="Date Of Birth" placeholder="Date Of Birth" hideFromTable/>
        <Field name="alt_number" label="Alternate Number" placeholder="Alternate Number" hideFromTable/>
        <Field name="institution" label="Institution" placeholder="Institution" />
        <Field name="educational_qualification" label="Educational qualification" placeholder="Educational Qualification" hideFromTable/>
        <Field name="photo" label="Photo" placeholder="Photo" hideFromTable/>
        <Field name="professional_exp" label="Professional Experience" placeholder="Professional Experience"hideFromTable type="number" />
        <Field name="created_date_time" label="Created Date And Time" placeholder="Created Date And Time" hideFromTable />
        <Field name="updated_date_time" label="Updated Date And Time" placeholder="Updated Date And Time" hideFromTable/>
        <Field name="updatedBy" label="Updated By" placeholder="Updated By" hideFromTable />
        <Field name="createdBy" label="Created By" placeholder="Created By" hideFromTable/>

      </Fields>
      {/* <CreateForm
        title="Student Creation"
        message="Create a new Student!"
        trigger="Create Student"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
              if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.name) {
            errors.student_id = "Please, provide Course Description";
          }

          if (!values.email) {
            errors.email = "Please, provide Course Type";
          }

          if (!values.phone_number) {
            errors.phone_number = "Please, provide Course SubType";
          }
          if (!values.fathers_name) {
            errors.fathers_name = "Please, provide Course Fees";
          }
          if (!values.mother_name) {
            errors.mother_name = "Please, provide Course Duration";
          }
          if (!values.address) {
            errors.address = "Please, provide Admin ID";
          }


          return errors;
        }}
      /> */}

      <UpdateForm
        title="Student Update Process"
        message="Update Student"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }

          if (!values.email) {
            errors.email = "Please, provide Email";
          }

          if (!values.phone_number) {
            errors.phone_number = "Please, provide Phone Number";
          }
          if (!values.fathers_name) {
            errors.fathers_name = "Please, provide Father's Name";
          }
          if (!values.mother_name) {
            errors.mother_name = "Please, provide Mother's Name";
          }
          if (!values.address) {
            errors.address = "Please, provide Address";
          }
          if (!values.gender) {
            errors.gender = "Please, provide Gender";
          }
          if (!values.dob) {
            errors.dob = "Please, provide Date Of Birth";
          }
          if (!values.alt_number) {
            errors.alt_number = "Please, provide Alternate Number";
          }
          if (!values.institution) {
            errors.institution = "Please, provide Institution Details";
          }
          if (!values.educational_qualification) {
            errors.educational_qualification = "Please, provide Qualification Details";
          }
          if (!values.photo) {
            errors.photo = "Please, provide Photo";
          }
          if (!values.professional_exp) {
            errors.professional_exp = "Please, provide Experience Details";
          }
          if (!values.created_date_time) {
            errors.created_date_time = "Please, provide Created Date And Timr Info";
          }
          if (!values.updated_date_time) {
            errors.updated_date_time = "Please, provide Updated Date And Timr Info";
          }
          if (!values.updatedBy) {
            errors.updatedBy = "Please, provide Updated By Details";
          }
          if (!values.createdBy) {
            errors.createdBy = "Please, provide Created By Details";
          }



          return errors;
        }}
      />
      <DeleteForm
        title="Student Delete Process"
        message="Are you sure you want to delete the Student?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }

          if (!values.email) {
            errors.email = "Please, provide Email";
          }

          if (!values.phone_number) {
            errors.phone_number = "Please, provide Phone Number";
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


class AdminStudentsData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <StudentsTest/> 
      </div>
      );
    }
  }
   
  export default AdminStudentsData;