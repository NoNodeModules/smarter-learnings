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

function PostUppdateStatus(StatusRow){
  console.log(StatusRow)
axios
      .post('http://103.142.165.146:8080/smarter-learnings/login-type/user', StatusRow )
      .then(response => {
        if(response.status==200)
        window.location.reload();
      })
      .catch(error => {
        toast('Its Time to Grab A coffee')
      })
}

function deleteStatus(id){
  const url = "http://103.142.165.146:8080/smarter-learnings/login-type/user/"+id;
  axios.delete(url)
  window.location.reload("/")
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

  if (data.field === "username") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "status"){
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
  update: data => {
    const task = tasks.find(t => t.username === data.username);
    task.status = data.status;
    PostUppdateStatus(task)
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.username === data.username);
    deleteStatus(data.username);
    tasks = tasks.filter(t => t.username !== task.username);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const StatusTest  = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="MARKS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="username" label="Username" placeholder="Username" readOnly />
        <Field name="status" label="Status" placeholder="Status" />
      </Fields>
 <UpdateForm
        title="Active Members"
        message="Active Members"
        trigger= "Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.status) {
            errors.status = "Please, provide status";
          }


          return errors;
        }}
        />
    <DeleteForm
        title="Active Members"
        message="Are you sure you want to delete the Active Members?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.status) {
            errors.status = "Please, provide username";
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


class StatusPage extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <StatusTest /> 
      </div>
      );
    }
  }
   
  export default StatusPage;