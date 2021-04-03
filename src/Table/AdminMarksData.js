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
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
}

function Emailperson(AdminMarksRow){
  console.log(AdminMarksRow)
axios
      .post('http://103.142.165.146:8080/smarter-learnings/marks/email/', AdminMarksRow )
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        toast('Its Time to Grab A coffee')
      })
}

function PostUpdateMarks(AdminMarksRow){
axios
      .post('http://103.142.165.146:8080/smarter-learnings/marks/', AdminMarksRow )
      .then(response => {
        if(response.status==200)
        window.location.reload();
      })
      .catch(error => {
        toast('Its Time to Grab A coffee')
      })
}

function deletemarks(id){
  const url = "http://103.142.165.146:8080/smarter-learnings/marks/"+id;
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
  },
  create: task => {
    tasks.push({
     });
     PostUpdateMarks(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    task.student_id = data.student_id;
    task.grade = data.grade;
    task.name = data.name;
    task.test_type = data.test_type;
    task.science = data.science;
    task.social = data.social;
    task.mathematics = data.mathematics;
    task.first_language = data.first_language;
    task.second_language = data.second_language;
    task.third_language = data.third_language;
    task.max_score = data.max_score;
    task.total = data.total;
    task.test_date = data.test_date;
    task.percentage = data.percentage;
    task.email_id = data.email_id;

    Emailperson(task);
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.id === data.id);
    deletemarks(data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
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
        <Field name="id" label="ID" placeholder="ID" type="number" />
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
        <Field name="email_id" label="Email" placeholder="Email" />
      </Fields>
      <CreateForm
        title="Marks Creation"
        message="Create a new Marks!"
        trigger="Create Marks"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.grade) {
            errors.grade = "Please, provide Grade";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }
          if (!values.test_type) {
            errors.test_type = "Please, provide Test Type";
          }
          if (!values.science) {
            errors.science = "Please, provide Science Marks";
          }
          if (!values.social) {
            errors.social = "Please, provide Social Marks";
          }
          if (!values.mathematics) {
            errors.mathematics = "Please, provide Mathematics Marks";
          }
          if (!values.first_language) {
            errors.first_language = "Please, provide First Language Marks";
          }
          if (!values.second_language) {
            errors.second_language = "Please, provide Second Language Marks";
          }
          if (!values.third_language) {
            errors.third_language = "Please, provide Third Language Marks";
          }
          if (!values.max_score) {
            errors.max_score = "Please, provide Maximum Marks";
          }
          if (!values.total) {
            errors.total = "Please, provide Total";
          }
          if (!values.test_date) {
            errors.test_date = "Please, provide Test Date";
          }
          if (!values.percentage) {
            errors.percentage = "Please, provide Percentage";
          }


          return errors;
        }}
      />
 <UpdateForm
        title="Marks Email Process"
        message="Email student"
        trigger= "Email"
        onSubmit={task => service.update(task)}
        submitText="Email"
        validate={values => {
          const errors = {};

          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.grade) {
            errors.grade = "Please, provide Grade";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }
          if (!values.test_type) {
            errors.test_type = "Please, provide Test Type";
          }
          if (!values.science) {
            errors.science = "Please, provide Science Marks";
          }
          if (!values.social) {
            errors.social = "Please, provide Social Marks";
          }
          if (!values.mathematics) {
            errors.mathematics = "Please, provide Mathematics Marks";
          }
          if (!values.first_language) {
            errors.first_language = "Please, provide First Language Marks";
          }
          if (!values.second_language) {
            errors.second_language = "Please, provide Second Language Marks";
          }
          if (!values.third_language) {
            errors.third_language = "Please, provide Third Language Marks";
          }
          if (!values.max_score) {
            errors.max_score = "Please, provide Maximum Marks";
          }
          if (!values.total) {
            errors.total = "Please, provide Total";
          }
          if (!values.test_date) {
            errors.test_date = "Please, provide Test Date";
          }
          if (!values.percentage) {
            errors.percentage = "Please, provide Percentage";
          }


          return errors;
        }}
        />
    <DeleteForm
        title="Marks Delete Process"
        message="Are you sure you want to delete the Marks?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.grade) {
            errors.grade = "Please, provide Grade";
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


class AdminMarksData extends Component {
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
   
  export default AdminMarksData;