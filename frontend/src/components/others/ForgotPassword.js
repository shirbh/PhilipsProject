import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    else if (password !== verifyPassword)
      newErrors.password = "Passwords must be the same";
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
        await axios.post("http://localhost:3003/auth/forgot-password", {
          email,
          password,
        });
        setTimeout(() => {
          navigate("../");
          setLoading(false);
        }, 300);
      } catch (e) {
        setTimeout(() => {
          setLoading(false);
          errors.login = "Invalid details";
        }, 300);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 style={{ fontSize: "50px" }} className="login-title">
          Password Reset
        </h2>
        <Form onSubmit={handleSubmit} className="login-form">
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
              style={{ fontSize: "20px" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontSize: "20px" }}>
              Verify Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              isInvalid={!!errors.password}
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
            Reset Password
          </Button>
          <Link to="../">Back to login</Link>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
