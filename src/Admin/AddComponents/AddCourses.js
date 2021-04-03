import React, {Component} from 'react'
import {APIData} from '../../Authentication/APIData';
import axios from 'axios';
import { toast } from 'react-toastify';

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

class AddCourses extends Component {
    constructor(props) {
		super(props)

		this.state = {
			course_id: '',
			course_type: '',
			course_fees: '',
            course_duration:'',
            admin_id:sessiondetails.user,
            course_description: '',
            course_sub_type: ''
		}
	}
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
            .post(APIData.api+'courses/', this.state,{headers:APIData.headers})
			.then(response => {
				toast("Course added")
                window.location.reload("/")
			})
			.catch(error => {
				console.log(error)
			})
	}

    render() { 
        const {course_id, course_type, course_fees, course_duration, course_description, course_sub_type } = this.state
        return (
            <form className="addcourses" onSubmit={this.submitHandler}>    

            <div className="carrybox">
             <div>
      <h2 className="mainheading01">Add</h2>
    </div>

    <div className="carrybox">
            <label className="heading02" htmlFor="COURSE ID">COURSE ID:</label><br/>
            <input
            placeholder="COURSE ID" 
            className="inputfield"

            type="text" 
            name="course_id"
            value={course_id}
            onChange={this.changeHandler}

            />

           </div>
            <div className="carrybox">
            <label className="heading02" htmlFor="COURSE TYPE">COURSE TYPE:</label><br/>

            <input 
            placeholder="COURSE TYPE" 
            className="inputfield"
            
            type="text" 
            name="course_type"
            value={course_type}
            onChange={this.changeHandler}
            
            
            />

           </div>

           <div className="carrybox">
            <label className="heading02" htmlFor="COURSE FEES">COURSE FEES:</label><br/>

            <input 
            placeholder="COURSE FEES" 
            className="inputfield" 
            
            type="number" 
            name="course_fees"
            value={course_fees}
            onChange={this.changeHandler} 
            />
            </div>
        <div className="carrybox">
            <label className="heading02" htmlFor="COURSE DURATION">COURSE DURATION:</label><br/>

            <input 
            placeholder="COURSE DURATION" 
            className="inputfield" 

            type="text"
            name="course_duration"
            value={course_duration}
            onChange={this.changeHandler} 
            
            />
            </div>
            <div className="carrybox">
            <label className="heading02" htmlFor="COURSE DESCRIPTION">COURSE DESCRIPTION:</label><br/>

            <textarea 
            placeholder="COURSE DESCRIPTION" 
            className="inputfield" 

            type="text"
            name="course_description"
            value={course_description}
            onChange={this.changeHandler} 
            />
            </div>
            <div className="carrybox">
            <label className="heading02" htmlFor="COURSE SUB TYPE">COURSE SUB TYPE:</label><br/>

            <textarea 
            placeholder="COURSE SUB TYPE" 
            className="inputfield" 

            type="text"
            name="course_sub_type"
            value={course_sub_type}
            onChange={this.changeHandler} 
            />
            </div>
            {/*<div className="carrybox">
            <label className="heading02" htmlFor="email">Confirm Password:</label><br/>
            <input placeholder="Confirm Password" className="inputfield" type="password"  />
            </div>*/}
            <div className="submitcarry">
                    <button className="Submitbutton" type="submit" onChange={this.validation} >UPDATE</button>

          
       </div>
            </div>
        </form>
          );
    }
}
 
export default  AddCourses;

