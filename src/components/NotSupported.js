import React, { Component } from 'react';


class NotSupported extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-warning">
            <div className="panel-body">
              WebRTC is not available in your browser.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotSupported;
