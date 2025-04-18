import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './dashboard.css';


function Dashboard() {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState("");

    //on startup get user and all user data 
    useEffect(() => {
        // fetching user data
        fetch("http://127.0.0.1:5000/users/user",{
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"}   
        })
        .then(res => res.json())
        .then(data => {
            setUser(data.email)
            // console.log(data);
        })

        //fetching all users to display as a leaderboard
        fetch("http://127.0.0.1:5000/users/all-users", {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type":"application/json"}
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "You are not authenticated"){
                alert("You are not authenticated");
            }
            else{
                setUsers(data);
                console.log(data);
            }
        })

        //fetch from dog API
        fetch("https://dog.ceo/api/breeds/image/random",{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setImg(data.message);
            console.log(data.message)
        });

    }, []);

    return(
        <div className="main-dash">
            <h1> Hello, {user}!</h1>
            <img src={img} alt="dog"></img>
        </div>
    );
}


export default Dashboard;