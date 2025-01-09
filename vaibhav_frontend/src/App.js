//import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./entry/main";
import Signup from "./entry/signup";
import Login from "./entry/login";
import Pdash from "./entry/pdash";
import Cdash from "./entry/cdash";
import Free from "./client/freeslot";
import PProf from "./client/providerprofile";
import Park from "./client/addparking";
import Book from "./client/fillslots";
import Cprof from "./client/clientprofile";
import Fpark from "./client/fetchparking";
import PdashNew from "./entry/pdash_new";
import PdashNew2 from "./entry/pdash_new2";
import DashboardLayout2 from "./owner_dasboard/dasboardLayout2";
import Welcome from "./owner_dasboard/pages/welcome";

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/pdash" element={<Pdash/>}></Route>
        <Route path="/pdash_new" element={<PdashNew/>}></Route>
        <Route path="/pdash_new2" element={<PdashNew2 />}>
          <Route path="/pdash_new2/" element={<Welcome/>}></Route>
          <Route path="/pdash_new2/pprof" element={<PProf/>}></Route>
          <Route path="/pdash_new2/parking" element={<Park/>}></Route>
          <Route path="/pdash_new2/bookslot" element={<Book/>}></Route>
          <Route path="/pdash_new2/freeslot" element={<Free/>}></Route>
          <Route path="/pdash_new2/viewpark" element={<Welcome/>}></Route>
        </Route>
        <Route path="/cdash" element={<Cdash/>}></Route>
        <Route path="/pprof" element={<PProf/>}></Route>
        <Route path="/parking" element={<Park/>}></Route>
        <Route path="/bookslot" element={<Book/>}></Route>
        <Route path="/freeslot" element={<Free/>}></Route>
        <Route path="/cprof" element={<Cprof/>}></Route>
        <Route path="/cfpark" element={<Fpark/>}></Route>
    </Routes>
    </Router>
  );
}

export default App;




