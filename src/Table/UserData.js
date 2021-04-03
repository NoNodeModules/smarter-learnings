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
  UpdateForm,
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

function postupdateuser(rowuserdata){
  var responseuser = null;
axios
      .post('http://103.142.165.146:8080/smarter-learnings/users/', rowuserdata )
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

  if (data.field === "user_email") {
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
  else if (data.field === "user_password"){
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
     postupdateuser(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.user_email === data.user_email);
    task.user_name =  data.user_name;
    task.user_password = data.user_password;
    task.user_phone_number = data.user_phone_number;
    postupdateuser(task);
    return Promise.resolve(task);
    //    if(postupdateuser(task))
    // { window.location.reload("");
    //   return Promise.resolve(task);
    // }
    // else
    // { //(toast)console.log("Failed")
    //   return Promise.resolve(data);
    // }
  },
  delete: data => {
    const task = tasks.find(t => t.user_email === data.user_email);
    tasks = tasks.filter(t => t.user_email !== task.user_email);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Usertest = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="USERS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="user_email" label="Email" placeholder="Email" readOnly />
        <Field name="user_name" label="Name" placeholder="Name"  />
        <Field
          name="user_password"
          label="Password"
        />
        <Field name="user_phone_number" label="Phone Number" placeholder="Phone Number" type="number" />
      </Fields>
      <UpdateForm
        title="User Update Process"
        message="Update User"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.user_email) {
            errors.user_email = "Please, provide User's Email";
          }

          if (!values.user_name) {
            errors.user_name = "Please, provide User name";
          }

          if (!values.user_password) {
            errors.user_password = "Please, provide User Password";
          }

          if (!values.user_phone_number) {
            errors.user_phone_number = "Please, provide User Phone Number";
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


class UserData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Usertest/> 
      </div>
      );
    }
  }
   
  export default UserData;