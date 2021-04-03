import React from "react";
import axios from 'axios';
import '../CRUDTable.css'
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  Pagination
} from "react-crud-table";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

toast.configure()

// Component's Base CSS
//import "./index.css";

console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
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
  else if (data.field === "grade"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "test_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "test_date"){
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
  }
 };

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const MarksTest  = () => (
  
  
  <div style={styles.container}>
    <CRUDTable
      caption="MARKS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" placeholder="ID"  />
        <Field name="student_id" label="Student ID" placeholder="Student ID" />
        <Field name="grade" label="Grade" placeholder="Grade" />
        <Field name="name" label="Name" placeholder="Name" />
        <Field name="test_type" label="Test Type" placeholder="Test Type" />
        <Field name="science" label="Science" placeholder="Science" type="number"/>
        <Field name="social" label="Social" placeholder="Social" type="number"/>
        <Field name="mathematics" label="Mathematics" placeholder="Mathematics" type="number"/>
        <Field name="first_language" label="First Language" placeholder="First Language" type="number"/>
        <Field name="second_language" label="Second Language" placeholder="Second Language" type="number"/>
        <Field name="third_language" label="Third Language" placeholder="Third Language" type="number"/>
        <Field name="max_score" label="Max Score" placeholder="Max Score" type="number"/>
        <Field name="total" label="Total" placeholder="Total" type="number"/>
        <Field name="test_date" label="Test Date" placeholder="Test Date" type="date"/>
        <Field name="percentage" label="Percentage" placeholder="Percentage" />
      </Fields>
           <Pagination
        itemsPerPage={10}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>

)


class StudentMarksData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <MarksTest /> 
      </div>
      );
    }
  }
   
  export default StudentMarksData;