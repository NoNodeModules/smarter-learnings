import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import FacultyDocumentData from "../Table/FacultyDocumentData";
import { APIData } from "../Authentication/APIData";
class Facultydocuments extends Component {
  state={
      loading: true,
      Files: null
  };
 async componentDidMount(){
  const url = APIData.api+'file/';
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({Files: daata, loading: false});
  }       
  render() {
  return (
    <div className="facultydocuments">
    <div className="admins">
    <main className="wrapper">

      <section className="hero">
        <h1>Smarter Learning's</h1>
        <article>
          <p>Welcome</p>
          <a href="#webpage">Contact Us</a>
        </article>
      </section>
      <section className="webpage" id="webpage">
        <Link to="/addFiles">
        <a>Add+</a>
        </Link>

        <ul>
          <li>
          <div>
            <h3  className="heading01">Files</h3>
            </div>
            <figure>
              <div>  
          </div>
        </figure>
              {this.state.loading || !this.state.Files ? <Loading />: 
              <p>
    <div className="carrybox">
    <FacultyDocumentData data={this.state.Files}/>
    </div>
              </p>}
            <a href="#">Next</a>
          </li>
        </ul>
      </section>
      </main>
    </div>
    <footer>
      <p>Contact Us For More Information</p>
    </footer>
  </div>
  );
  }
 }
export default Facultydocuments;