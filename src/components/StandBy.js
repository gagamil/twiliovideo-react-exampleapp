import React, { Component } from 'react';


class StandBy extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <button onClick={this.props.startHander} className="btn btn-default">Connect</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StandBy;
