import React from 'react';
import ReactDOM from 'react-dom';

//import Video from 'twilio-video';

import StandBy from './components/StandBy.js';
import NotSupported from './components/NotSupported.js';
import Room from './components/Room.js';


// *********************************************************** DRIVER
var videoClient = null;
var connectionData = {};
showStandVyView();

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  showNotSupportedView();

}else{
  $.getJSON('http://localhost:8000/token', function(data){
    console.log(data);
    connectionData = data;
  })
  .fail(function() {
    console.log( "error" );
  });
}

// *********************************************************** HANDLERS
function handleStartSession(){
  connectToCarrier();
  if(videoClient){
    showRoomView(videoClient, connectionData.roomName);
  }
}

// *********************************************************** TWILIO
function connectToCarrier(){
  videoClient = new Twilio.Video.Client(connectionData.token);
}

// *********************************************************** REACT VIEWS
function showRoomView(client, roomName){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(<Room videoClient={client} roomName={roomName}/>, document.getElementById('root'));
}

function showStandVyView(){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(<StandBy startHander= {handleStartSession} />, document.getElementById('root'));
}

function showNotSupportedView(){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(<NotSupported />, document.getElementById('root'));
}
