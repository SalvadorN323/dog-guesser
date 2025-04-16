import React, {useState} from "react";
import {Routes, Route} from "react-router-dom"
import Dashboard from "../src/pages/dashboard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//main login component
function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to handle form submission
  function handleLogin(e){
    e.preventDefault();
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
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
        alert("Wrong password or email")
        window.location.href = "/";
      }
    })
  }

  return(
    <div className="main">
        <div className="login-container">
          <h1 style={{textAlign: 'center'}}>Login</h1>
          <form onSubmit={handleLogin}>
            <TextField id="outlined-required" label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <Button variant="contained" type="submit">Login</Button>
          </form>
        </div>

    </div>
  );
}

//main register component
function Register(){
  return(
    <div className="main">
      <h1>Register</h1>
    </div>
  );
}


function App(){
  return(
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route path="/register" element={ <Register/> }/>
      <Route path="/dashboard" element={ <Dashboard/>}/>
    </Routes>
  );

}

export default App;