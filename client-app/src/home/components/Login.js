import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "../../components/Grid";
import { CommonButton } from "../../components/CommonButton";
import { HttpRequestSender } from "../../utility/HttpRequestSender";
import config from "../../config.json";
import {
  hasDefaultValue,
  createProcessResult,
  Constants,
} from "../../utility/Utils";

const requestSender = new HttpRequestSender(config.BASE_URL);
const unsuccesfulLoginMessage =
  "Login unsuccessful! Make sure that your input values in correct format";

const validateLoginParams = (email, password) => {
  if (hasDefaultValue(email)) return createProcessResult(false, "EnterEmail");
  if (hasDefaultValue(password))
    return createProcessResult(false, "EnterPassword");

  return createProcessResult(true);
};

async function loginUser(email, password) {
  let loginParamsValidationResult = validateLoginParams(email, password);
  if (!loginParamsValidationResult.isSuccessful)
    return loginParamsValidationResult;

  var loginResult = await requestSender.AwaitableSendRequest(
    Constants.HttpMethods.POST,
    config.EndPoints.login,
    {
      email: email,
      password: password,
    }
  );

  return loginResult;
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResult = await loginUser(email, password);
    if (!hasDefaultValue(loginResult) && loginResult.isSuccess) {
      setToken(loginResult.responseData.token);
    } else {
      alert(unsuccesfulLoginMessage);
    }
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
          </form>
          <div
            style={{
              float: "right",
              width: "25%",
              height: "4vh",
            }}
          >
            <CommonButton text="Log In" handleClick={handleSubmit} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
