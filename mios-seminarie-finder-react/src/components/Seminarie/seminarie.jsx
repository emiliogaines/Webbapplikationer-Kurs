import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import FormDialog from "../FormDialog/formdialog";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

import "./seminarie.css";

class Seminarie extends Component {
  state = {
    openSnackbar: false,
    openSnackbarError: false,
    courses: [],
    activity: false,
  };
  render() {
    return (
      <div className="row">
        <div className="col">
          {this.state.activity ? (
            <LinearProgress className="mx-1 my-1" />
          ) : this.state.courses.length === 0 && !this.state.activity ? (
            <small className="white">
              Ingen anslutning till databasen{" "}
              <FontAwesomeIcon icon={faHeartBroken} />
            </small>
          ) : null}
          {this.state.courses.map((item) => (
            <div key={item.name} className="card card-color shadow m-2">
              <div className="card-body">
                <div className="d-flex w-100 justify-content-between">
                  <h5>
                    <FontAwesomeIcon icon={faBook} /> {item.name}
                  </h5>
                  <small>
                    {this.getDaysSincePost(item.published)} dagar sedan
                  </small>
                </div>
                <p>{item.description}</p>
                <div className="row">
                  <div className="col">
                    <small>Ansökningar: </small>
                    {item.students.map((user) => (
                      <span className="badge badge-halloween m-1" key={user.id}>
                        <img
                          className="user-picture"
                          alt=""
                          src={
                            "https://avatars.dicebear.com/api/avataaars/" +
                            user.name +
                            ".svg"
                          }
                        />
                        {" " + user.name}
                      </span>
                    ))}
                  </div>
                  <div className="col-md-auto">
                    <FormDialog
                      sendApplication={this.sendApplication.bind(this)}
                      courseId={item.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Snackbar
            open={this.state.openSnackbar}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            onClose={this.handleCloseDialog}
          >
            <Alert onClose={this.handleCloseDialog} severity="success">
              Din ansökan är skickad!
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.openSnackbarError}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            onClose={this.handleCloseDialogError}
          >
            <Alert onClose={this.handleCloseDialogError} severity="error">
              Du har redan ansökt eller så var din ansökan ej ifylld.
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }

  handleCloseDialog = () => {
    this.setState({ openSnackbar: false });
  };

  handleCloseDialogError = () => {
    this.setState({ openSnackbarError: false });
  };

  sendApplication(name = "", email = "", courseId = -1) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, courseId: courseId }),
    };

    this.setState({ activity: true });

    fetch("https://localhost:44367/api/register", requestOptions)
      .then((response) => {
        this.setState({ activity: false });
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (
          this.state.courses.find((x) => x.id === courseId).students.length !==
          data.find((x) => x.id === courseId).students.length
        ) {
          this.setState({ courses: data, openSnackbar: true });
        } else {
          this.setState({ openSnackbarError: true });
        }
      })
      .catch((error) => {
        this.setState({ activity: false });
      });
  }

  getDaysSincePost(date) {
    let date1 = new Date(date);
    let date2 = new Date();
    let Difference_In_Time = date2.getTime() - date1.getTime();
    return Math.round(Difference_In_Time / (1000 * 3600 * 24));
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ activity: true, courses: [] });
    fetch("https://localhost:44367/api/courses")
      .then((response) => {
        this.setState({ activity: false });
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => this.setState({ courses: json }))
      .catch((error) => {
        this.setState({ activity: false });
      });
  }
}

export default Seminarie;
