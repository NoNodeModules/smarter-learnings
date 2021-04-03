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

function PostTimeTable(StudentTimeTable){
axios
      .post('http://103.142.165.146:8080//smarter-learnings/timetable/', StudentTimeTable )
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

function deleteTimeTable(StudentTimeTable){
  console.log(StudentTimeTable.id);
  const url = 'http://103.142.165.146:8080//smarter-learnings/timetable/' + StudentTimeTable.id;
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

  if (data.field === "time") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "day"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "subject"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "facultyname"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "grade"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "createdDate"){
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
     PostTimeTable(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    task.id = data.id;
    task.day = data.day;
    task.subject = data.subject;
    task.facultyname = data.facultyname;
    task.time = data.time;
    task.grade = data.grade;
    task.createdDate = data.createdDate;
    PostTimeTable(task);
    return Promise.resolve(task);
  },
   delete: data => {
     const task = tasks.find(t => t.id === data.id);
     deleteTimeTable(task);
     tasks = tasks.filter(t => t.id !== task.id);
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const TimeTabletest = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="TIME TABLE"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" placeholder="ID" type="number"/>
        <Field name="day" label="Day" placeholder="Day"  />
        <Field name="subject" label="Subject" placeholder="Subject" />
        <Field name="facultyname" label="Faculty Name" placeholder="Faculty Name" />
        <Field name="time" label="Time" placeholder="Time" />
        <Field name="grade" label="Grade" placeholder="Grade" />
        <Field name="createdDate" label="Created Date" placeholder="Created Date" type="date"/>
      </Fields>  
      <Pagination
        itemsPerPage={10}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>

)


class FacultyTimeTableData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <TimeTabletest/> 
      </div>
      );
    }
  }
   
  export default FacultyTimeTableData;