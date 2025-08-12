// src/pages/UserLogin.jsx
import React, { useState } from "react";
import { Tabs, Tab, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [tab, setTab] = useState(0);
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    qualification: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user-login/", signInData);
      if (res.data.success) {
        navigate("/games"); // Go to games page
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Error during sign in");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user-register/", signUpData);
      if (res.data.success) {
        alert("Registered successfully! Please sign in.");
        setTab(0);
      }
    } catch (err) {
      alert("Error during sign up");
    }
  };

  return (
    <Box sx={{ width: "400px", margin: "auto", mt: 5 }}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={signInData.username}
            onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
          />
          <Button variant="contained" fullWidth onClick={handleSignIn}>Sign In</Button>
        </Box>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 3 }}>
          <TextField label="First Name" fullWidth margin="normal"
            value={signUpData.firstname} onChange={(e) => setSignUpData({ ...signUpData, firstname: e.target.value })} />
          <TextField label="Last Name" fullWidth margin="normal"
            value={signUpData.lastname} onChange={(e) => setSignUpData({ ...signUpData, lastname: e.target.value })} />
          <TextField label="Age" type="number" fullWidth margin="normal"
            value={signUpData.age} onChange={(e) => setSignUpData({ ...signUpData, age: e.target.value })} />
          <TextField label="Qualification" fullWidth margin="normal"
            value={signUpData.qualification} onChange={(e) => setSignUpData({ ...signUpData, qualification: e.target.value })} />
          <TextField label="Username" fullWidth margin="normal"
            value={signUpData.username} onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })} />
          <TextField label="Password" type="password" fullWidth margin="normal"
            value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} />
          <Button variant="contained" fullWidth onClick={handleSignUp}>Sign Up</Button>
        </Box>
      )}
    </Box>
  );
}
