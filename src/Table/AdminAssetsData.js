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
import { Link } from "react-router-dom";

toast.configure()
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
// Component's Base CSS
//import "./index.css";
const DescriptionRenderer = ({ field }) => <textarea {...field} />;
console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
}

function Postassets(AdminAssetsRow){
  var senddata={
    assets_id : AdminAssetsRow.assets_id,
    admin_id:sessiondetails.user,
    assets_cost : AdminAssetsRow.assets_cost,
    assets_name : AdminAssetsRow.assets_name,
    assets_purchased_date : AdminAssetsRow.assets_purchased_date,
    assets_count : AdminAssetsRow.assets_count,
    grade : AdminAssetsRow.grade,
    gst : AdminAssetsRow.gst
  }

axios
      .post('http://103.142.165.146:8080//smarter-learnings/assets/', senddata )
      .then(response => {
        if(response.data.status =="Success"){
          window.location.reload("/");
        }
        else{
          toast('Update Failed')
        }
      })
      .catch(error => {
        toast('Update Failed')
      })
}

function deleteassets(AdminAssetsRow){
  console.log(AdminAssetsRow.assets_id);
  const url = 'http://103.142.165.146:8080//smarter-learnings/assets/' + AdminAssetsRow.assets_id;
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
  let sorter = SORTERS.NUMBER_ASCENDING(mapper);

  if (data.field === "assets_id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } 
  else if (data.field === "assets_count"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }
  else if (data.field === "assets_cost"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }
  else if (data.field === "assets_purchased_date"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }
  else if (data.field === "gst"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }

  else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
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
     Postassets(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.assets_id === data.assets_id);
    task.admin_id = sessiondetails.user;
    task.assets_cost = data.assets_cost;
    task.assets_name = data.assets_name;
    task.assets_purchased_date = data.assets_purchased_date;
    task.assets_count = data.assets_count;
    task.gst = data.gst;
    Postassets(task);
    return Promise.resolve(task);
  },
   delete: data => {
     const task = tasks.find(t => t.assets_id === data.assets_id);
     deleteassets(task);
     tasks = tasks.filter(t => t.assets_id !== task.assets_id);
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Assettest = () => (
  
  
  <div style={styles.container}>
    <Link to="/createassets"><div>Add assets</div></Link>
    <CRUDTable
      caption="ASSETS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="assets_id" label="Assets ID" placeholder="Assets ID" hideInCreateForm hideInUpdateForm type="number"/>
        <Field name="admin_id" label="Admin ID" placeholder="Admin ID" readOnly hideInCreateForm />
        <Field name="assets_cost" label="Assets Cost" placeholder="Assets Cost" type="number" />
        <Field name="assets_name" label="Assets Name" placeholder="Assets Name" />
        <Field name="assets_purchased_date" label="Assets Purchased Date" placeholder="Assets Purchased Date" type="date" />
        <Field name="assets_count" label="Assets Count" placeholder="Assets Count" type="number" />
        <Field name="gst" label="GST" placeholder="GST"  />
      </Fields>
      <CreateForm
        title="Time Table Creation"
        message="Create a new Time Table!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          //     if (!values.id) {
          //   errors.id = "Please, provide Time Table ID";
          // }

          if (!values.admin_id) {
            errors.admin_id = "Please, provide Admin ID";
          }

          if (!values.assets_cost) {
            errors.assets_cost = "Please, provide Asset's Cost";
          }

          if (!values.assets_name) {
            errors.assets_name = "Please, provide Asset's Name";
          }
          if (!values.assets_purchased_date) {
            errors.assets_purchased_date = "Please, provide Asset's Purchased date";
          }
          if (!values.assets_count) {
            errors.assets_count = "Please, provide Asset's Count";
          }
           if (!values.gst) {
             errors.gst = "Please, provide Admin ID";
           }


          return errors;
        }}
      />

      <UpdateForm
        title="Asset Update Process"
        message="Update Asset"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.assets_id) {
            errors.assets_id = "Please, provide Asset ID";
          }

          if (!values.admin_id) {
            errors.admin_id = "Please, provide Admin ID";
          }

          if (!values.assets_cost) {
            errors.assets_cost = "Please, provide Asset's Cost";
          }

          if (!values.assets_name) {
            errors.assets_name = "Please, provide Asset's Name";
          }
          if (!values.assets_purchased_date) {
            errors.assets_purchased_date = "Please, provide Asset's Purchased date";
          }
          if (!values.assets_count) {
            errors.assets_count = "Please, provide Asset's Count";
          }
        //   if (!values.gst) {
        //     errors.gst = "Please, provide Admin ID";
        //   }


          return errors;
        }}
      />
      <DeleteForm
        title="Asset Delete Process"
        message="Are you sure you want to delete the Asset?"
        trigger={<AiIcons.AiFillDelete />}
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
              if (values.assets_id===null) {
            errors.assets_id = "Please, provide Asset ID";
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


class AdminAssetsData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Assettest/> 
      </div>
      );
    }
  }
   
  export default AdminAssetsData;