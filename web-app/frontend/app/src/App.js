import React, {useState} from "react";
import {Routes, Route} from "react-router-dom"
import Dashboard from "../src/pages/dashboard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../src/App.css";

//main login component
function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to handle form submission
  function handleLogin(e){
    e.preventDefault();
    fetch("http://127.0.0.1:5000/auth/login", {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
    //then function to convert the response to json
    .then(res => res.json())
    //function to handle navigation
    .then(data => {
      if (data.status === "success"){
        window.location.href = "/dashboard";
      }
      else if (data.status === "Account does not exist, please register"){
        alert(data.status);
        window.location.href = "/register";
      }
      else{
        alert("Wrong password or email");
        window.location.href = "/";
      }
    });
  };

  return(
    <div className="main">
        <div className="login-container">
          <h1 style={{textAlign: 'center'}}>Nice to see you again!</h1>
          <h2 style={{textAlign: 'center'}}>Login</h2>
          <form onSubmit={handleLogin}>
            <TextField style={{width: '390px', marginBottom: '15px'}} label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <TextField style={{width: '390px', marginBottom: '15px'}} label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <Button style={{marginLeft: '162px'}} variant="contained" type="submit">Login</Button>
            <br />
            <h3 style={{textAlign: 'center'}}>Don't have an account?</h3>
            <Button style={{marginLeft: '146px'}} variant="contained" href="/register">Register</Button>
          </form>
        </div>

    </div>
  );
}

//main register component
function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed_password, setConfirmedPassword] = useState("");

  //when the form is submitted the button will call this function
  function handleRegister(e){
    e.preventDefault();
    //http post request to register backend API call
    fetch("http://127.0.0.1:5000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password, confirmed_password})
    })
    //get backend response and turn into json
    .then(res => res.json())
    //gets that json response to check for successful register
    .then(data => {
      if (data.status === "Registered successfully!"){
        alert(data.status);
        window.location.href = "/";
      }
      else if (data.status === "Account already exists"){
        alert(data.status);
        window.location.href = "/";
      }
      else{
        //confirmed password and password didn't match
        alert(data.status);
        window.location.href = "/register";
      }
    })
  }

  return(
    <div className="main">
      <div className="register-container">
        <h1 style={{textAlign: 'center'}}>Register here!</h1>
        <br />
        <form onSubmit={handleRegister}>
          <TextField style={{width: '250px', marginBottom: '15px'}} label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <br />
          <TextField style={{width: '250px', marginBottom: '15px'}} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br />
          <TextField style={{width: '250px', marginBottom: '15px'}} label="Confirm Password" type="password" value={confirmed_password} onChange={(e) => setConfirmedPassword(e.target.value)}/>
          <br />
          <Button style={{marginBottom: '15px', marginLeft: '75px'}} variant="contained" type="submit">Register</Button>
          <br />
          <Button style={{marginLeft: '84px'}} variant="contained" href="/">Sign In!</Button>
        </form>
      </div>
    </div>
  );
}


function App(){
  return(
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route path="/register" element={ <Register/> }/>
      <Route path="/dashboard" element={ <Dashboard/> }/>
    </Routes>
  );

}

export default App;