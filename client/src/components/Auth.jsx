import React, { Component } from "react";
import { connect } from "react-redux";
import image from "./assets/Pictlogo.jpeg";
import style from "./assets/style.css";

//import Auth_Page from '../pages/Auth_Page';
import {
  authUser,
  logout,
  authUser_f,
  logout_f,
  authUser_a,
} from "../store/actions";
import NavBar from "../containers/NavBar";
//import { Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      User_type: "1",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { username, password, User_type } = this.state;
    const { authType } = this.props;
    e.preventDefault();
    if (User_type === "1") {
      this.props.authUser(authType || "login", { username, password });
    }
    if (User_type === "2") {
      this.props.authUser_f("login_faculty", { username, password });
    }
    if (User_type === "3") {
      this.props.authUser_a("login_admin", { username, password });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      /*<div className="container">
        <div className="card mx-auto my-5">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <form className="form-group my-3" onSubmit={this.handleSubmit}>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="input"
                type="text"
                value={username}
                name="username"
                autoComplete="off"
                className="form-control"
                onChange={this.handleChange}
              />

              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                type="password"
                value={password}
                name="password"
                className="form-control"
                autoComplete="off"
                onChange={this.handleChange}
              />

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Role:</label>
                <select
                  name="User_type"
                  defaultValue="1"
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option name="student" value="1">
                    STUDENT
                  </option>
                  <option name="faculty" value="2">
                    FACULTY
                  </option>
                  <option name="admin" value="3">
                    ADMIN
                  </option>
                </select>
              </div>
              {/* <Auth_Page User_type={this.state.User_type}/> }    //comment this

              <div className="button_center">
                <button className="btn btn-dark" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */
      <section>
        <div class="container">
          <div class="user signinBx">
            <div class="imgBx">
              <img src={image} />
            </div>
            <div class="formBx">
              <form onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <input
                  className="input"
                  type="text"
                  value={username}
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  className="form-control"
                  onChange={this.handleChange}
                />

                <input
                  className="input"
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <select
                  name="User_type"
                  defaultValue="1"
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option name="student" value="1">
                    STUDENT
                  </option>
                  <option name="faculty" value="2">
                    FACULTY
                  </option>
                  <option name="admin" value="3">
                    ADMIN
                  </option>
                </select>

                <input type="submit" value="Login" />
                <p class="signup">
                  <a href="#ForgotPassword">Forgot password?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(() => ({}), {
  authUser,
  logout,
  authUser_f,
  logout_f,
  authUser_a,
})(Auth);
