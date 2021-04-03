import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

function ContactUser() {
    return (
      <div className="contact">
            <div className="carrybox">
                <div >
                  <h2 className="mainheading01">Contact</h2>
                </div>
                <div className="carrybox">
                  <h4 className="heading02"><HiIcons.HiLocationMarker/> Location:</h4>
                  <p className="ptag"># 228 1st floor near Krishna Temple,<br />Krishna Temple Road ,<br /> Doddabommasandra,<br /> Vidyaranyapura post.<br />Bangalore -560097</p>
                </div>
                <div className="carrybox">
                  <h4 className="heading02"><HiIcons.HiClock/> Hours</h4>
                  <p className="ptag">Monday - Saturday: 10:30am - 8pm <br /> Sunday: By appointment</p>
                </div>
                <div className="carrybox">
                  <h4 className="heading02"><HiIcons.HiPhone/> Call:</h4>
                  <p className="ptag">+91 74115 26951</p>
                </div>
                      <div className="carrybox">
                        <h4 className="heading02"><AiIcons.AiOutlineWhatsApp/> What's App</h4><br />
                <p><a href=" https://wa.me/917411526951" target="_blank" className="hp"> Send message</a></p>
                </div>
            </div>
      </div>
    )
}
export default ContactUser
