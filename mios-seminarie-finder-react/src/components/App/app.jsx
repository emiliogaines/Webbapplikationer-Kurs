import React, { Component } from "react";
import Seminarie from "../Seminarie/seminarie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

class Website extends Component {
  state = {};
  render() {
    return (
      <div className="row m-2">
        <div className="col-md-6 offset-md-3 ">
          <div className="card shadow p-2">
            <div className="row">
              <div className="col">
                <h5>
                  <FontAwesomeIcon icon={faGhost} /> Mio's Spooky Seminarie
                  Finder
                </h5>
                <small>
                  9/10 Tandläkare rekommenderar INTE det här verktyget
                </small>
              </div>
            </div>
          </div>
          <Seminarie />
        </div>
      </div>
    );
  }
}

export default Website;
