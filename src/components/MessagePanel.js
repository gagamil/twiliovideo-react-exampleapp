import React, { Component } from 'react';


class MessagePanel extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.message}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePanel;
