import React, { Component } from 'react';
import '../index.css'

var gRoom = null;
window.addEventListener('beforeunload', leaveRoomIfJoined);


class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {connectedToRoom: false, connState:'OFFLINE'};

    this.roomJoined = this.roomJoined.bind(this);
    this.handeLeaveRoom = this.handeLeaveRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount(){
    this.joinRoom();
  }

  joinRoom(){
    this.props.videoClient.connect({ to: this.props.roomName}).then(this.roomJoined,
        function(error) {
          console.log('Could not connect to Twilio: ' + error.message);
        });
  }
  roomJoined(room){
    this.room = room;
    gRoom = room;
    if(!this.previewMedia){
      this.room.localParticipant.media.attach(this.refs.localmedia);
    }
    this.setState({connState:'CONNECTED'});

    //CONNECT
    this.room.participants.forEach(participant=> {
      console.log("Already in Room: '" + participant.identity + "'");
      participant.media.attach(this.refs.remotemedia);
      this.setState({connState:'PARTICIPANTADD'});
    });

    // When a participant joins, draw their video on screen
    this.room.on('participantConnected',  participant=> {
      console.log("Joining: '" + participant.identity + "'");
      participant.media.attach(this.refs.remotemedia);
      this.setState({connState:'PARTICIPANTADD'});
    });

    //DISCONNECT
    // When a participant disconnects, note in log
    this.room.on('participantDisconnected', function (participant) {
      console.log("Participant '" + participant.identity + "' left the room");
      participant.media.detach();
      this.setState({connState:'PARTICIPANTREMOVE'});
    });

    // When we are disconnected, stop capturing local video
    // Also remove media for all remote participants
    this.room.on('disconnected',  ()=> {
      console.log('Left');
      this.room.localParticipant.media.detach();
      this.room.participants.forEach(function(participant) {
        participant.media.detach();
      });
      this.setState({connState:'DISCONNECTED'});
      this.room = null;
    });
  }

  handeLeaveRoom(){
    console.log("handeLeaveRoom");
    this.room.disconnect();
    this.setState({connState:'DISCONNECTED'});
  }

  render() {
    var leaveRoomButton = "";
    if(this.state.connState=="CONNECTED"){
      leaveRoomButton = <button onClick={this.handeLeaveRoom} className="btn btn-default">Leave Room</button>
    }
    var joinRoomButton = "";
    if(this.state.connState=="DISCONNECTED"){
      joinRoomButton = <button onClick={this.joinRoom} className="btn btn-default">Join Room</button>
    }
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
          {leaveRoomButton}{joinRoomButton}
        </div>

      </div>

    );
  }
}

function leaveRoomIfJoined() {
  if (gRoom) {
    gRoom.disconnect();
  }
}
export default Room;
