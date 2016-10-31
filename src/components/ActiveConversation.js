import React, { Component } from 'react';
import '../index.css'


class ActiveConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {participantConnected:false};
    this.handeLeaveConversation = this.handeLeaveConversation.bind(this);
  }

  componentDidMount(){
    console.log("ActiveConversation::componentDidMount");
    this.room = this.props.room;
    this.room.localParticipant.media.attach(this.refs.localmedia);


    // TODO -will assume that this app is about 1 on 1 conversation => need to follow this concept here...
    this.room.participants.forEach(participant=> {
      this.participant=participant;
      this.participant.media.attach(this.refs.remotemedia);
      console.log("Already in Room: '" + this.participant.identity + "'");
      this.setState({participantConnected:true});
    });

    // When a participant joins, draw their video on screen
    this.room.on('participantConnected',  participant=> {
      console.log("Joining: '" + participant.identity + "'");
      this.participant=participant;
      this.participant.media.attach(this.refs.remotemedia);
      this.setState({participantConnected:true});
    });

    //DISCONNECT
    this.room.on('participantDisconnected', function (participant) {
      console.log("Participant '" + participant.identity + "' left the room");
      participant.media.detach();//? need to pass this to the child?
      this.setState({participantConnected:false});
    });

    // When we are disconnected, stop capturing local video
    // Also remove media for all remote participants
    this.room.on('disconnected',  ()=> {
      console.log('I Left the room');
      this.room.localParticipant.media.detach();
      this.room.participants.forEach(function(participant) {
        participant.media.detach();
      });
      this.setState({participantConnected:false});
      this.room = null;
    });
  }

  componentWillUnmount(){
    console.log("ActiveConversation::componentWillUnMount");
    this.room.localParticipant.media.detach();
    this.participant.media.detach();
  }

  handeLeaveConversation(){
    this.props.handleLeave()
  }

  render() {
    return (

      <div className="row">
        <div id="callPanel" className="panel panel-default" style={{display: 'block' }}>
          <div className="panel-heading">
            <h3 className="panel-title">Call with PUT_NAME_HERE</h3>
          </div>
          <div className="panel-body">
            <div id="videoPanel">
              <div id="remoteVideo"  ref="remotemedia"></div>
              <div id="localVideo"  ref="localmedia"></div>
              <div id="remoteVideoBg" style={{display: 'none' }}></div>
              <div id="localVideoBg" style={{display: 'none' }}></div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <button onClick={this.handeLeaveConversation} className="btn btn-default">Leave conversation</button>
        </div>
      </div>

    );
  }
}

export default ActiveConversation;
