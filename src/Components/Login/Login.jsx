import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    axios.post(`http://localhost:5000/api/auth/login`, {
      email: email,
      password: password
    })
      .then(function (result) {
        console.log(result);
        if (result) {
          sessionStorage.setItem("scKey", result?.data?.token)
          sessionStorage.setItem("role", result?.data?.role)
          alert("User Login Successful");
          nav('/dashboard')
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("Login failed, Please try again");
      });

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login
