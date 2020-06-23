import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { getFaculty } from "../store/actions/admin";
import {
  MdFormatListBulleted,
  MdAssignmentInd,
  MdSupervisorAccount,
  MdViewAgenda,
  MdLocalLibrary,
  MdSettings,
} from "react-icons/md";
class FacultyList extends Component {
  //   state={
  //     isLoading: true,
  //     dataNew:{
  //         username:"Srushti",
  //         address:"pune",
  //         email:"s@gmail.com",
  //         phonenumber:"7896541230",
  //     },
  // };

  constructor(props) {
    super(props);
    //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      isLoading: true,
      faculties: [
        {
          _id: "",
          name: { firstname: "", lastname: "" },
          currentClass: { year: "", div: "" },
          department: "",
          username: "",
          designation: "",
          emailId: "",
        },
      ],
    };
  }
  async componentDidMount() {
    const { getFaculty } = this.props;
    getFaculty()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.faculty));
  }
  loadData(facultylist) {
    this.setState({ faculties: facultylist });
  }
  handleListView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  handleCardView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }
  }
  expandInline(e) {
    e.target.parentElement.lastChild.style.display = "block";
  }
  // handlefilter(e) {
  //   if (e.target.value !== "") {
  //     var elements = document.querySelectorAll(
  //       "div[id='*" + e.target.value + "*']"
  //     );
  //     console.log(elements);
  //   }
  // }
  renderCardData() {
    return this.state.faculties.map((faculty) => {
      const {
        _id,
        username,
        name,
        currentClass,
        department,
        designation,
        emailId,
      } = faculty; //destructuring
      return (
        <div
          className="col-sm-6"
          key={_id}
          id={
            username +
            name.firstname +
            name.lastname +
            currentClass.year +
            currentClass.div +
            department +
            designation
          }
        >
          <div className="card my-2">
            <div className="card-header" onClick={this.expandInline.bind(this)}>
              Prof. {name.firstname + " " + name.lastname}
              <span className="float-right">
                {designation === "ClassCoordinator" ? (
                  <span className="mx-1">
                    <MdLocalLibrary size="24" color="firebrick" />
                  </span>
                ) : designation === "Admin" ? (
                  <span className="mx-1">
                    <MdSettings size="24" color="blue" />
                  </span>
                ) : designation === "DepartmentIntershipCoordinator" ? (
                  <span className="mx-1">
                    <MdAssignmentInd size="24" color="green" />
                  </span>
                ) : designation === "CollegeInternshipCoordinator" ? (
                  <span className="mx-1">
                    <MdSupervisorAccount size="24" color="orange" />
                  </span>
                ) : (
                  <span></span>
                )}
              </span>
              <br />
              <small className="text-muted">Username: {username}</small>
            </div>
            <div className="card-body">
              <b> Current Class : </b>
              {currentClass.year + " " + currentClass.div}
              <br />
              <b> Department : </b>
              {department}
              <br />
              <b> Designation : </b>
              {designation}
              <br />
              <b> Email Id : </b>
              {emailId}
              <br />
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="2" />
          </div>
          <div className="col-sm-10 of">
            <div className="container">
              {/* {<MDBDataTable dark data={this.state.faculties} />} */}
              <h4 className="mt-2">
                Faculty List
                <div className="float-right">
                  <div
                    className="btn-group btn-group-toggle btn-sm"
                    data-toggle="buttons"
                  >
                    <label
                      className="btn btn-secondary btn-sm"
                      onClick={this.handleListView}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autoComplete="off"
                      />
                      <MdFormatListBulleted color="white" />
                    </label>
                    <label
                      className="btn btn-secondary active btn-sm"
                      onClick={this.handleCardView}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                      />
                      <MdViewAgenda color="white" />
                    </label>
                  </div>
                </div>
              </h4>
              <hr />
              <div class="row">{this.renderCardData()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    faculty: store.faculty,
  }),
  { getFaculty }
)(FacultyList);
