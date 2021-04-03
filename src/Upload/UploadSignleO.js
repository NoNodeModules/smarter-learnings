import React,{Component} from 'react';
import axios from "axios";
import { APIData } from '../Authentication/APIData';

 
class UploadSingle extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null,
      type:null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
      console.log(event.target.files)
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };

    changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value })
    }
    
    // On file upload (click the upload button)
    onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "file",
        this.state.selectedFile
      );


      formData.append(
        "type",this.state.type
      );

    
      // Details of the uploaded fil
    
      // Request made to the backend api
      // Send formData object
      axios.post(APIData.api+"office-file/", formData,{headers:APIData.headers});
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
<p>File Type: {this.state.selectedFile.type}</p>
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div className="uploadsingle">
          <div className="carrybox">
            <h3  className="heading01">
              File Uploads!
            </h3>
            <div className="bringitcenter">
                <input className="Upload"  type="file" onChange={this.onFileChange} />
                <button className="Upload" onClick={this.onFileUpload}>

                  Upload!
                </button>
                <input  className="Upload" type="text"
                   name="type"
                   value={this.state.type}
                   onChange={this.changeHandler}/>
          {this.fileData()}     
        </div>
        </div>
        </div>
      );
    }
  }
 
  export default UploadSingle;