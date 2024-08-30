import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [, setIsSigned, , setTitle, user, setUser] = useContext(AppContext);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setLoading(true);
        setErrors({});
        const response = await axios.post("http://localhost:3003/auth/login", {
          email,
          password,
        });
        setTimeout(() => {
          console.log({ user: response.data });
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem(
            "isAdmin",
            response.data.permissions.length !== 0
          );
          setIsSigned(true);
          localStorage.setItem("signedIn", true);
          setTitle("Home");
          response.data.permissions.length !== 0
            ? navigate("../home")
            : navigate("../employee-home", { state: response.data });
          setLoading(false);
        }, 300);
      } catch (e) {
        setTimeout(() => {
          setLoading(false);
          errors.login = "Invalid email";
        }, 300);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 style={{ fontSize: "50px" }} className="login-title">
          Login
        </h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Control.Feedback type="invalid">
            {errors.login}
          </Form.Control.Feedback>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: "20px" }}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              style={{ fontSize: "20px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontSize: "20px" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              size="30px"
              style={{ fontSize: "20px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="login-button"
            style={{ fontSize: "20px" }}
          >
            Login
          </Button>
          <Link to="../forgot-password">forgot password?</Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
