/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

"use strict";

let localConnection: RTCPeerConnection | null = null;
let remoteConnection: RTCPeerConnection | null = null;
let sendChannel: RTCDataChannel | null = null;
let receiveChannel: RTCDataChannel | null = null;

const dataChannelSend = document.querySelector<HTMLTextAreaElement>(
  "textarea#dataChannelSend"
);
const dataChannelReceive = document.querySelector<HTMLTextAreaElement>(
  "textarea#dataChannelReceive"
);
const startButton =
  document.querySelector<HTMLButtonElement>("button#startButton");
const sendButton =
  document.querySelector<HTMLButtonElement>("button#sendButton");
const closeButton =
  document.querySelector<HTMLButtonElement>("button#closeButton");

startButton?.addEventListener("click", createConnection);
sendButton?.addEventListener("click", sendData);
closeButton?.addEventListener("click", closeDataChannels);

function enableStartButton() {
  if (startButton) startButton.disabled = false;
}

function disableSendButton() {
  if (sendButton) sendButton.disabled = true;
}

function createConnection() {
  if (dataChannelSend) dataChannelSend.placeholder = "";
  const servers: RTCConfiguration | undefined = undefined;
  localConnection = new RTCPeerConnection(servers);
  console.log("Created local peer connection object localConnection");

  sendChannel = localConnection.createDataChannel("sendDataChannel");
  console.log("Created send data channel");

  localConnection.onicecandidate = e => {
    if (localConnection) onIceCandidate(localConnection, e);
  };
  sendChannel.onopen = onSendChannelStateChange;
  sendChannel.onclose = onSendChannelStateChange;

  remoteConnection = new RTCPeerConnection(servers);
  console.log("Created remote peer connection object remoteConnection");

  remoteConnection.onicecandidate = e => {
    if (remoteConnection) onIceCandidate(remoteConnection, e);
  };
  remoteConnection.ondatachannel = receiveChannelCallback;

  localConnection
    .createOffer()
    .then(gotDescription1, onCreateSessionDescriptionError);

  if (startButton) startButton.disabled = true;
  if (closeButton) closeButton.disabled = false;
}

function onCreateSessionDescriptionError(error: Error) {
  console.log("Failed to create session description: " + error.toString());
}

function sendData() {
  const data = dataChannelSend?.value || "";
  sendChannel?.send(data);
  console.log("Sent Data: " + data);
}

function closeDataChannels() {
  console.log("Closing data channels");
  sendChannel?.close();
  console.log("Closed data channel with label: " + sendChannel?.label);
  receiveChannel?.close();
  console.log("Closed data channel with label: " + receiveChannel?.label);
  localConnection?.close();
  remoteConnection?.close();
  localConnection = null;
  remoteConnection = null;
  console.log("Closed peer connections");

  if (startButton) startButton.disabled = false;
  if (sendButton) sendButton.disabled = true;
  if (closeButton) closeButton.disabled = true;
  if (dataChannelSend) dataChannelSend.value = "";
  if (dataChannelReceive) dataChannelReceive.value = "";
  if (dataChannelSend) dataChannelSend.disabled = true;
  disableSendButton();
  enableStartButton();
}

function gotDescription1(desc?: RTCSessionDescriptionInit) {
  localConnection?.setLocalDescription(desc);
  console.log(`Offer from localConnection\n${desc?.sdp}`);

  if (desc) remoteConnection?.setRemoteDescription(desc);
  remoteConnection
    ?.createAnswer()
    .then(gotDescription2, onCreateSessionDescriptionError);
}

function gotDescription2(desc: RTCSessionDescriptionInit) {
  remoteConnection?.setLocalDescription(desc);
  console.log(`Answer from remoteConnection\n${desc.sdp}`);
  localConnection?.setRemoteDescription(desc);
}

function getOtherPc(pc: RTCPeerConnection) {
  return pc === localConnection ? remoteConnection : localConnection;
}

function getName(pc: RTCPeerConnection) {
  return pc === localConnection
    ? "localPeerConnection"
    : "remotePeerConnection";
}

function onIceCandidate(
  pc: RTCPeerConnection,
  event: RTCPeerConnectionIceEvent
) {
  getOtherPc(pc)
    ?.addIceCandidate(event.candidate ?? undefined)
    .then(onAddIceCandidateSuccess, onAddIceCandidateError);
  console.log(
    `${getName(pc)} ICE candidate: ${
      event.candidate ? event.candidate.candidate : "(null)"
    }`
  );
}

function onAddIceCandidateSuccess() {
  console.log("AddIceCandidate success.");
}

function onAddIceCandidateError(error: Error) {
  console.log(`Failed to add Ice Candidate: ${error.toString()}`);
}

function receiveChannelCallback(event: RTCDataChannelEvent) {
  console.log("Receive Channel Callback");
  receiveChannel = event.channel;

  receiveChannel.addEventListener("message", onReceiveMessageCallback);
  receiveChannel.addEventListener("open", onReceiveChannelStateChange);
  receiveChannel.addEventListener("close", onReceiveChannelStateChange);
}

function onReceiveMessageCallback(event: MessageEvent) {
  console.log("Received Message");
  if (dataChannelReceive) dataChannelReceive.value = event.data;
}

function onSendChannelStateChange() {
  const readyState = sendChannel?.readyState;
  console.log("Send channel state is: " + readyState);
  if (readyState === "open") {
    if (dataChannelSend) {
      dataChannelSend.disabled = false;
      dataChannelSend.focus();
    }

    if (sendButton) sendButton.disabled = false;
    if (closeButton) closeButton.disabled = false;
  } else {
    if (dataChannelSend) dataChannelSend.disabled = true;
    if (sendButton) sendButton.disabled = true;
    if (closeButton) closeButton.disabled = true;
  }
}

function onReceiveChannelStateChange() {
  const readyState = receiveChannel?.readyState;
  console.log(`Receive channel state is: ${readyState}`);
}
