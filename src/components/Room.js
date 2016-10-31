import React, { Component } from 'react';
import '../index.css'

import ActiveConversation from './ActiveConversation.js';
import MessagePanel from './MessagePanel.js';

var gRoom = null;
window.addEventListener('beforeunload', leaveRoomIfJoined);


class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {connState:'DISCONNECTED'};

    this.joinRoom = this.joinRoom.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.handeLeaveConversation = this.handeLeaveConversation.bind(this);
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
    gRoom = room;
    this.setState({connState:'CONNECTED'});
  }

  handeLeaveConversation(){
    console.log("handeLeaveConversation");
    this.room.disconnect();
    this.setState({connState:'DISCONNECTED'});
  }

  startConversation(){
    this.setState({connState:'START'});
  }

  render() {
    //var joinRoomButton = <button onClick={this.startConversation} className="btn btn-default">Join Room</button>
    var component = <MessagePanel message='not connected' />;
    if(this.state.connState=='CONNECTED'){
      component = <ActiveConversation room={gRoom} />
    }
    return (
      <div>{component}</div>
    );
  }
}

function leaveRoomIfJoined() {
  if (gRoom) {
    gRoom.disconnect();
    gRoom=null;
  }
}
export default Room;
