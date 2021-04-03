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

// Component's Base CSS
//import "./index.css";

console.log();
let tasks = [];

function  getTask(testTask){
  console.log(tasks)
  tasks = testTask;
  // console.log(tasks);
}

function DownloadFile(AdminDocumentsRow){
  const url = 'http://103.142.165.146:8080/smarter-learnings/file/' + AdminDocumentsRow.id;
 window.location.href = url;
}

 function DeleteFile(AdminDocumentsRow){
   const url = 'http://103.142.165.146:8080/smarter-learnings/file/' + AdminDocumentsRow.id;
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

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "fileName"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "file_size"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }
  else if (data.field === "uploaded_date"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "fileType"){
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
    const task = tasks.find(t => t.id === data.id);
    DownloadFile(task);
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.course_id === data.course_id);
    DeleteFile(task);
    tasks = tasks.filter(t => t.course_id !== task.course_id);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const DocumentsTest = () => (
  
  
  <div style={styles.container}>
    <Link to="/uploadsingle">    <div className="Submit"><AiIcons.AiOutlinePlusCircle/></div>
</Link>
    <CRUDTable
      caption="DOCUMENTS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="File ID" placeholder="File ID" readOnly />
        <Field name="fileName" label="File Name" placeholder="File Name" readOnly />
        <Field name="file_size" label="File Size" placeholder="File Size" readOnly />
        <Field name="uploaded_date" label="Date OF Uplode" placeholder="Date OF Uplode" readOnly />
        <Field name="fileType" label="Type" placeholder="Type" readOnly />
      </Fields>
      
      <UpdateForm
        title="File Download "
        message="File Details"
        trigger= {<AiIcons.AiOutlineDownload />}
        onSubmit={task => service.update(task)}
        submitText="Download"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide Course ID";
          }

          if (!values.fileName) {
            errors.fileName = "Please, provide Course Description";
          }

          if (!values.file_size) {
            errors.file_size = "Please, provide Course Type";
          }

          if (!values.uploaded_date) {
            errors.uploaded_date = "Please, provide Course SubType";
          }
          if (!values.fileType) {
            errors.fileType = "Please, provide Course Fees";
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
               if (!values.id) {
             errors.id = "Please, provide Course ID";
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


class AdminDocumentsData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <DocumentsTest/> 
      </div>
      );
    }
  }
   
  export default AdminDocumentsData;
