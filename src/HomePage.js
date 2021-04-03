import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Navigation/Dropdown';
import './Navigation/Navbar.css';
import logo01 from "./Images/01.jpg"
import logo02 from  "./Images/02.jpg"
import logo03 from  "./Images/03.jpg"
import logo04 from  "./Images/04.jpg"
import logo05 from  "./Images/05.jpg"
import logo06 from  "./Images/06.jpg"
import logo07 from  "./Images/07.jpg"
import logo08 from  "./Images/08.jpg"
import logo from  "./Images/smart.png"


function HomePage() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  
const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}
const [isOpen, setIsOpen] = useState(false)

              return (
  <div className="homepage">
    
    <nav className='navbar'>
        <div>
            <img className="logo" src={logo} alt="logo" border="0"/>
        </div>
        <div>
          <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-sign-in-alt'} />
          </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/signup' className='nav-links' onClick={closeMobileMenu}>
              Sign Up
            </Link>
            </li>
            <li className='nav-item'>
            <Link to='/adminsignin' className='nav-links' onClick={closeMobileMenu}>
              Institutional Sign In
            </Link>
            </li>
            <li className='nav-item'>
            <Link to='/signin' className='nav-links' onClick={closeMobileMenu}>
              User Sign In
            </Link>
            
          </li>
    
          {/* <li className='nav-item'>
            <Link  className='nav-links' onClick={closeMobileMenu}>
              <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
                <Link onClick={() => setIsOpen(true)}>User Sign In</Link>
                  <SignInModal open={isOpen} onClose={() => setIsOpen(false)}>
                   <Signin />
                  </SignInModal>
                </div>    
            </Link>
          </li> */}
        {/* <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
          <Link
          
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Sign In <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <Dropdown />}
          </li> */}
             {/* 
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
            <div>
        <img className="logo01" src="https://i.ibb.co/tPBqzm4/loogo.png" />
        </div>*/}  
        </ul>
    </div>
          </nav>

    
          <div>
          <main className="wrapper">
            <section className="hero">
              <h1>Smarter Learning's</h1>
                <article>
                  <p>Welcome</p>
                 <Link to="contact"><a href="#webpage">Contact Us</a></Link> 
                 {/* <Link to="contact"><a href="#webpage" >Apply For Job</a></Link>  */}
                </article>
              </section>
            <section className="webpage" id="webpage">
            <ul>
              <li>
                <div>
                  <h3  className="heading01">Foundation classes</h3>
                </div>
                    <figure>
                      <img src={logo01} alt="IMAGES" />
                    </figure>
                    <p>
                    Foundation Classes & Tuitions is designed to address the needs of students looking to study and understand the strong basics as per the syllabus and curriculum from grade 8th to 10th and PUC (11th & 12th).
                    </p>
              <Link to="signin">Visit Website</Link>
              </li>
              <li>
              <div><h3  className="heading01">CET & JEE Coaching</h3></div>
                <figure>
                  {/* Photo by Drew Farwell on Unsplash */}
                  <img src={logo02} alt="Several friends doing a toast" />
                </figure>
                <p>
                JEE & CET is an engineering entrance assessment conducted for admission to various engineering colleges in Karnataka & across India.  Our comprehensive coaching and assessments assure to gear up students to fulfill their dreams and vision.                </p>
                  <Link to="signin">Visit Website</Link>
              </li>
              <li>
              <div><h3  className="heading01">NEET Coaching</h3></div>
                <figure>
                  {/* Photo by Rawpixel on Unsplash */}
                  <img src={logo03} alt="Three different glasses of beer" />
                </figure>
                <p>
                Assist students to  prepare for medical entrance examinations through study materials and mock exams compiled by experts in the Indian medical.                </p>
                  <Link to="signin">Visit Website</Link>
              </li>

              <li>
              <div><h3  className="heading01">Corporate Trainings</h3></div>
                <figure>
                  {/* Photo by Quentin Dr on Unsplash */}
                  <img src={logo04} alt="IMAGES" />
                </figure>
                <p>
                Experts spanning the industry segments are deployed to provide Industry specific and subject oriented training programs. Regional based trainers with appropriate training certification and industry specific experience deliver the program providing healthy ROI for the corporate and industry alike. 
                </p>
                  <Link to="signin">Visit Website</Link>
              </li>
              <li>
              <div><h3  className="heading01">Mulesoft Training</h3></div>
                <figure>
                  {/* Photo by Drew Farwell on Unsplash */}
                  <img src={logo05} alt="Several friends doing a toast" />
                </figure>
                <p>
                Can start your carrier as a Mulesoft Developer. Students have LANDED NEW JOBS with the skills from this course. Mulesoft developers are in HIGH-DEMAND!                 </p>
                  <Link to="signin">Visit Website</Link>
              </li>
              <li>
              <div><h3  className="heading01">Personalized Classes</h3></div>
                <figure>
                  {/* Photo by Rawpixel on Unsplash */}
                  <img src={logo06} alt="Three different glasses of beer" />
                </figure>
                <p>
                Introduce “Student Voice.” Encourage input from students on instructional decisions and materials. Give them a voice to express their values, opinions and beliefs. This will lead to a more diverse and richer set of instructional materials that will help you personalize learning.                 </p>
                  <Link to="signin">Visit Website</Link>
              </li>

              <li>
              <div><h3  className="heading01">Agri CET Coaching</h3></div>
                <figure>
                  {/* Photo by Quentin Dr on Unsplash */}
                  <img src={logo07} alt="IMAGES" />
                </figure>
                <p>
                Agriculture have a great scope. They deal with food production,  horticulture, rural economy and development, environmental health etc. This program will help you to know know more  about agricultural entrance exams.                  </p>
                  <Link to="signin">Visit Website</Link>
              </li>
              <li>
              <div><h3 className="heading01">Coding &  training</h3></div>
                <figure>
                  {/* Photo by Drew Farwell on Unsplash */}
                  <img src={logo08} alt="Several friends doing a toast" />
                </figure>
                <p>
                Curious about coding? Want to be a tech geek? Don’t be overwhelmed —  this beginner course is the perfect introduction to c & C++  programming. In this program, we'll tackle basic development principles  to get you started on the right path. No experience is necessary!                 </p>
                  <Link to="signin">Visit Website</Link>
              </li>
            </ul>
          </section>
        </main>
        <footer>
          <p>Contact Us For More Information</p>
        </footer>
      </div>
</div>
              )
            }
export default HomePage;