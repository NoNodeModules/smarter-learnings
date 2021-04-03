import React,{Component} from 'react';
import MainLogo from '../Images/logo.jpg';
import {toast} from 'react-toastify'; 
import axios from 'axios';
import {APIData} from '../Authentication/APIData';
function printPage() {
    document.getElementById("print").style.visibility = "hidden";
    window.print(document.getElementById("invoice"));
    window.location.reload();
  }

class Invoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student_id: '',
            email_id: "",
            paid: '',
            date: "",
            due_date: '',
            course: "",
            balance: ''
    
        };
    }

changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = e => {
        e.preventDefault()
        axios
        .post(APIData.api+'invoices/', this.state,{headers:APIData.headers})
        .then(response => {
            console.log(response)
        window.print()
        toast(response);

        })
        .catch(error => {
        toast("registration failed");
        console.log(error)
        })

    }


    render() {
    return (
        
      <div id="invoice" className="invoice">
          <form className="invoice" onSubmit={this.submitHandler}>  
          <div className="">

          </div>
          <div id ="print-section" className="carrybox">
          <div className="carrybox02">              <img className="invoiceimg" src={MainLogo} />
<h3 className="heading01">SMARTER LEARNING'S</h3></div>
          <table>
          
                    <tr>
                        <td>
                            <label
                        className="invoicelable"
                        > INVOICE ID</label>
                        </td>
                        </tr>

                        <tr>
                        <td>
                        <label
                        className="invoicelable"
                        > STUDENT ID</label>
                            <input 
                            className="invoiceinput"
                            name="student_id"
                            value={this.state.student_id}
                            placeholder="student ID"
                            type="text"
                            onChange={this.changeHandler}

                            ></input>
                        </td>
                        </tr>

                        <tr>
                        <td>
                        <label
                        className="invoicelable"
                        >EMAIL</label>
                            <input 
                            className="invoiceinput"
                            name="email_id"
                            value={this.state.email_id}
                            placeholder="Invoice ID"
                            type="email"
                            onChange={this.changeHandler}

                            ></input>
                        </td>
                        </tr> 
                        
                        <tr>
                        <td>
                        <label
                        className="invoicelable"
                        >PAID</label>
                            <input 
                            className="invoiceinput"
                            name="paid"
                            value={this.state.paid}
                            placeholder="Invoice ID"
                            type="number"
                            onChange={this.changeHandler}

                            ></input>
                        </td>
                        </tr> 
                        <tr>
                        <td>
                        <label
                        className="invoicelable"
                        >DATE</label>
                            <input 
                            className="invoiceinput"
                            name="date"
                            value={this.state.date}
                            placeholder="Invoice ID"
                            type="DATE"
                            onChange={this.changeHandler}

                            ></input>
                        </td>
                        </tr> 
                        
                        <tr>
                        <td>
                        <label
                        className="invoicelable"
                        >Due Date</label>
                            <input 

                            className="invoiceinput"
                            name="due_date"
                            value={this.state.due_date}
                            placeholder="Invoice ID"
                            type="date"
                            onChange={this.changeHandler}

                            ></input>
                        </td>
                        </tr> 
                        
                        
                        <tr>
                        <td>
                        <label                        
                        className="invoicelable"
                        >COURSE</label>
                            <input 
                            className="invoiceinput"
                            name="course"
                            value={this.state.course}
                            placeholder="Invoice ID"
                            onChange={this.changeHandler}
                            ></input>
                        </td>
                        </tr>

                        <tr>
                        <td>
                        <label 
                        className="invoicelable"
                        >Balance</label>
                            <input 
                            type="number"
                            className="invoiceinput"
                            name="balance"
                            value={this.state.balance}
                            placeholder="Invoice ID"
                            onChange={this.changeHandler}
                            ></input>
                        </td>
                        </tr>

                      
                   
              <tbody>
              <tr>
<div className="bringitcenter">
    <div className="ptag">228, Krishna, Temple Rd, Doddabommasandra, Vidyaranyapura, Bengaluru, Karnataka 560097</div>
</div>
                    </tr>
              </tbody>
          </table>
          </div>  

          <div >          
          <button id="print" onClick={printPage}
    printSectionId="print-section"
    ngxPrint >
              PRINT INVOICE
          </button>
            </div>

          </form>
    </div>
    );
    }
   }
  export default Invoice;