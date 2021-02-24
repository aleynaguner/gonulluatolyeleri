import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "../../components/Grid";
import { CommonButton } from "../../components/CommonButton";

function loginUser(credentials) {
  return `${credentials.email}${credentials.password}`;
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = loginUser({
      email,
      password,
    });
    if (email !== undefined) setToken(token);
  };

  return (
    <Container customStyle={{ marginTop: "8em" }}>
      <Row isCentered={true}>
        <h1>Please Log In</h1>
      </Row>
      <Row isCentered={true}>
        <Col responsiveSystem={{ sm: 6, md: 6, lg: 6, xl: 6 }}>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CommonButton
              text="Log In"
              customStyle={{ width: "10em", height: "auto", float: "right" }}
              handleClick={handleSubmit}
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
