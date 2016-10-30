import React from 'react';
import ReactDOM from 'react-dom';

//import Video from 'twilio-video';

import StandBy from './components/StandBy.js';
import NotSupported from './components/NotSupported.js';
import Room from './components/Room.js';


// *********************************************************** DRIVER
var videoClient;

showStandVyView();

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  showNotSupportedView();

}else{
  $.getJSON('http://localhost:8000/token', function(data){

    console.log(data);
      var identity = data.identity;
      console.log(identity);
      // Create a Video Client and connect to Twilio
      videoClient = new Twilio.Video.Client(data.token);
      showRoomView(videoClient, data.roomName);
  })
  .fail(function() {
    console.log( "error" );
  });
}

// *********************************************************** TWILIO

// *********************************************************** REACT VIEWS
function showRoomView(client, roomName){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(<Room videoClient={client} roomName={roomName}/>, document.getElementById('root'));
}

function showStandVyView(){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(<StandBy />, document.getElementById('root'));
}

function showNotSupportedView(){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(<NotSupported />, document.getElementById('root'));
}
