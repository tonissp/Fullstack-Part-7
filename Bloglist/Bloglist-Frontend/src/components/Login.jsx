import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
