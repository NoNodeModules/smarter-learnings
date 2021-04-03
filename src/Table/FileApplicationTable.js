import React, { Component } from 'react';
import * as AiIcons from "react-icons/ai";

import axios from 'axios';

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
class FileApplicationTable extends Component {
    constructor(props) {
        var fileid = "";
        var today = new Date(),
    datetime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
        this.state = {
            
            user_email: sessiondetails.userType,
            enrollment_type: "Student",
            enrollment_status: "applied",
            course_id: "",
            admin_id: "sathya",
            user_name: sessiondetails.email,
            user_phone_number: sessiondetails.phoneNumber,
            followup_datetime: datetime
        }
        }
        
        download (row){
            console.log(row.id);
            this.fileid = row.id;
            this.downloadfile();
            
        }
        downloadfile = e => {
            const url = new URL('http://103.142.165.146:8080//smarter-learnings/file/' + this.fileid);
            window.location.href = url;
        }

        getKeys = function(){
            return Object.keys(this.props.data[0]);
            }
        
        getHeader = function()
        {
            var keys = this.getKeys();
            return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
            })
        }   

        getRowsData = function(row){
            var items = this.props.data;
            var keys = this.getKeys();
            return items.map((row, index)=>{
            return <tr className="trs" key={index}><RenderRow key={index} data={row} keys={keys}/><button className="Submit" onClick={e => this.download(row)}><AiIcons.AiOutlineDownload />
            </button></tr>
            })
            }
        render() {
        return (
            <div className="fileapplicationtable">
                
        <div className="carrybox">
        <table className="table001">
        <thead>
        <tr className="trs">{this.getHeader()}<td className="trs" >Actions</td></tr>
        </thead>
        <tbody>
        {this.getRowsData()}
        </tbody>
        </table>
        </div>
        </div>
        
        );
        }
       }
       const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
        return <td key={props.data[key]}>{props.data[key]}</td>
        })
       }
export default FileApplicationTable;