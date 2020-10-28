import React, { Component } from "react";
import Seminarie from "../Seminarie/seminarie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faSync } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme } from "@material-ui/core/styles";

class Website extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ff6600",
      },
      secondary: {
        main: "#ff6600",
      },
    },
  });

  onClick = () => {
    this.child.current.fetchData();
  };

  state = {};
  render() {
    return (
      <div className="row m-2">
        <div className="col-md-6 offset-md-3 ">
          <div className="card shadow p-2">
            <div className="row">
              <div className="col m-2">
                <h5>
                  <FontAwesomeIcon icon={faGhost} /> Mio's Spooky Seminarie
                  Finder
                </h5>
                <small>
                  9/10 Tandläkare rekommenderar INTE det här verktyget
                </small>
              </div>
              <div className="col-mx m-2 align-middle d-flex">
                <IconButton
                  color="inherit"
                  aria-label="upload picture"
                  component="span"
                  onClick={this.onClick}
                >
                  <FontAwesomeIcon icon={faSync} />
                </IconButton>
              </div>
            </div>
          </div>
          <Seminarie ref={this.child} />
        </div>
      </div>
    );
  }
}

export default Website;
