import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  DeleteForm,
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

function PostUpdateAdmin(RowAdminData){
axios
      .post('http://103.142.165.146:8080/smarter-learnings/admins/', RowAdminData )
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        toast('Its time to Grab A Coffee')
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

  if (data.field === "admin_id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "admin_name"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "admin_email"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "admin_permissions"){
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
     PostUpdateAdmin(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.admin_id === data.admin_id);
    task.admin_name =  data.admin_name;
    task.admin_email = data.admin_email;
    task.admin_phone_number = data.admin_phone_number;
    task.admin_permissions = data.admin_permissions;
    task.admin_photo = data.admin_photo;
    PostUpdateAdmin(task);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Admintest = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="ADMINS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="admin_id" label="Admin ID" placeholder="Admin ID" readOnly />
        <Field name="admin_name" label="Name" placeholder=" Name"  />
        <Field name="admin_email" label="Email" placeholder="Email"/>
        <Field name="admin_phone_number" label="Phone Number" placeholder="Phone Number" type="number" />
        <Field name="admin_permissions" label="Permissions" placeholder="Permissions"/>
      </Fields>
      <UpdateForm
        title="Admin Update Process"
        message="Update Admin"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.admin_id) {
            errors.admin_id = "Please, provide Admin ID";
          }

          if (!values.admin_name) {
            errors.admin_name = "Please, provide Admin name";
          }

          if (!values.admin_email) {
            errors.admin_email = "Please, provide Admin Email";
          }

          if (!values.admin_phone_number) {
            errors.admin_phone_number = "Please, provide Admin Phone Number";
          }
          if (!values.admin_permissions) {
            errors.admin_permissions = "Please, provide Admin Permissions";
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


class AdminData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Admintest/> 
      </div>
      );
    }
  }
   
  export default AdminData;