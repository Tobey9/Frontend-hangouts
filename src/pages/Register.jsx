import React, { useState } from "react";
import "./styles/Register.css";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const data = {
    email: email,
    password: password,
    username: username,
    name: name,
  };

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !username || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    axios
      .post("/users/register", data)
      .then((response) => {
        setLoading(false);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          // Handle successful registration, e.g., redirect to login page
          console.log("Registration successful");
          toast.success("Registration successful");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during registration:", error);
        toast.error("An error occurred during registration");
      });
  };

  return (
    <div className="register">
      <h2>Create your account</h2>

      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>
      </form>
    </div>
  );
};
