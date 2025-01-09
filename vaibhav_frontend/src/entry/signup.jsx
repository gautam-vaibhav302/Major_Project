import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Main from "./main";
import { Link, useNavigate } from "react-router-dom";
import { signupservice } from "../services/user";
import Signnav from "./signnav";
import email from "../images/email.png";
import signup from "../images/signup-image.jpg";
import key from "../images/key.png";


function Sign(){

  const [obj,updateobj]=useState({email:"",pwd:"",con_pwd:"",type:"type"});

  const nagivate=useNavigate();
  const update=(event)=>{
      var {name,value}=event.target;

      updateobj({...obj,[name]:value});
  }

  function check(){
        if(obj.type==="type")
        return false;
        if(obj.email==="")
        return false;
        if(obj.pwd==="")
        return false;
  }

  // const signupuserwithquery=async()=>{

  //     var url="http://localhost:2002/user/signup-user-post";
  //     var resp=await axios.post(url,obj);
  //     if(resp.data.status)
  //     {
  //       nagivate("/");
  //     }
  //     else
  //     {
  //       alert(resp.data.message);
  //     }
  // }

  const signupuserwithquery=async()=>{

      var resp=await signupservice(obj);
      if(resp.data.status)
      {
        nagivate("/");
      }
      else
      {
        alert(resp.data.message);
      }
  }

    return(
        <div>
          
          <Signnav></Signnav>

          <div><div >

<section >
    <div >
        <div >
            <div>
                <h2 >Sign up</h2>
                <form method="POST"  id="register-form">
                    
                    <div>
                        <label for="email">
                        <img src={email} height="10px" width="10px" alt="" /></label>
                        <input type="email" name="email" id="email" placeholder="Your Email" onChange={update}/>
                    </div>
                    <div >
                        <label for="pass">
                        <img src={key} height="10px" width="10px" alt="" /></label>
                        <input type="password" name="pwd" id="pass" placeholder="Password" onChange={update}/>
                    </div>
                    <div >
                        <label for="re-pass">
                        <img src={key} height="10px" width="10px" alt=""/></label>
                        <input type="password" name="con_pwd" id="re_pass" placeholder="Repeat your password" onChange={update}/>
                    </div>
                    <div >
                        <Form.Select type="select" name="type" id="name" placeholder="signup AS" onChange={update}>
                        <option placeholder="signup AS">Signup as</option>
                        <option value="Client">car-owner</option>
                        <option value="Service-Provider">parking-Provider</option>
                        </Form.Select>
                    </div>
                    
                    <div >
                        <input type="button" name="signup" id="signup"  onClick={signupuserwithquery} value="Register"/>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
</section>
</div>

        </div>
        </div>
    )
}

export default Sign;