import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { getuserservice } from "../services/user";
import Signnav from "./signnav";
import email from "../images/email.png";
import signin from "../images/signin-image.jpg";
import pass from "../images/key.png";
 
function Loginhere() {
  const [obj, updateobj] = useState({ lemail: "", lpwd: "" });
  var navigate = useNavigate();

  const update = (event) => {
    var { name, value } = event.target;
    updateobj({ ...obj, [name]: value });
  };

  const loginwithquery = async () => {
    var url = "http://localhost:2002/user/login-with-query";
    var resp = await axios.post(url, {
      email: obj.lemail,
      pwd: obj.lpwd,
    });

    if (resp.data.status !== false) {
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("a_email", resp.data.user.email);

      if (resp.data.user.type === "Client") {
        navigate("/cdash");
      } else navigate("/pdash");
    } else {
      alert(resp.data.message);
    }
  };

  var token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      // const resp= await axios.get('http://localhost:2002/user/currentuser',
      // {
      //     headers:{
      //         'Authorization':token
      //     }
      // });

      const resp = await getuserservice();

      if (resp.data.status) {
        if (resp.data.user.type === "Client") {
          navigate("/cdash");
        } else {
          console.log("service-Provider");
          navigate("/pdash");
        }
      } else {
        alert(resp.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div>
      <div>
        <Signnav></Signnav>

        <div> <div>
      
    <section >
       <div >
           <div >
               <div >
                   <figure><img src={signin} alt="sing up image"/></figure>
                   <Link to="/signup">
                   Create an account
                   </Link>
               </div>

               <div >
                   <h2 >Login</h2>
                   <form method="POST"  id="login-form">
                       <div >
                           <label for="your_name"> <img src={email} height="10px" width="10px" alt=""/> </label>
                           <input type="text" value={obj.lemail} name="lemail" id="your_name" placeholder="Email" onChange={update}/>
                       </div>
                       <div >
                           <label for="your_pass"> <img src={pass} height="10px" width="10px" alt=""/></label>
                           <input type="password" value={obj.lpwd} name="lpwd" onChange={update} id="your_pass" placeholder="Password"/>
                       </div>
                       
                       <div>
                           <input type="button" onClick={loginwithquery} id="signin" value="Log in"/>
                       </div>
                   </form>
                   
               </div>

              
           </div>
       </div>
   </section>

    </div>
</div>
      </div>
    </div>
  );
}

export default Loginhere;
