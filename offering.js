function clickcreateoffer() {
  //caca();
  oldcaca();
  
  //~ console.log('clickcreateoffer');
  //~ document.getElementById('buttoncreateoffer').disabled = true;
  //~ document.getElementById('spanoffer').classList.toggle('invisible');
  //~ peerConnection = createPeerConnection(lasticecandidate);
  //~ dataChannel = peerConnection.createDataChannel('chat');
  //~ dataChannel.onopen = datachannelopen;
  //~ dataChannel.onmessage = datachannelmessage;
  //~ createOfferPromise = peerConnection.createOffer();
  //~ createOfferPromise.then(createOfferDone, createOfferFailed);
}

function oldcaca() {
        peerConnection2 = createPeerConnection(
        function() {
            console.log('caca lasticecandidate');
            offer = peerConnection2.localDescription;
            console.log(JSON.stringify(offer));
        }
    );
    dataChannel = peerConnection2.createDataChannel('chat');
    dataChannel.onopen = datachannelopen;
    dataChannel.onmessage = datachannelmessage;
    createOfferPromise = peerConnection2.createOffer();
    createOfferPromise.then(
        function(offer) {
            console.log('caca createOfferDone');
            setLocalPromise = peerConnection.setLocalDescription(offer);
            setLocalPromise.then(
                function() {
                    console.log('caca setLocalDone')
                },
                function (reason) {
                    console.log('caca setLocalFailed');
                    console.log(reason);
                });
        },
        function(reason) {
            console.log('caca createOfferFailed');
            console.log(reason);
        });
}

function caca() {
    console.log('caca');
    
    let configuration = {
        iceServers: [{
            urls: "stun:stun.stunprotocol.org"}]};
    
    let peerConnection3 = null;
    try {
        console.log('caca new RTCPeerConnection');
        peerConnection3 = new RTCPeerConnection(configuration);
    } catch(err) {
        console.log('caca error: ' + err);
    }
    
    peerConnection3.onicecandidate =
        function handleicecandidate() {
            return function(event) {
                if (event.candidate != null) {
                    console.log('caca new ice candidate');
                }
                else {
                    console.log('caca all ice candidates');
                    console.log('caca lasticecandidate');
                    let offer = peerConnection2.localDescription;
                    console.log(JSON.stringify(offer));
                }
            }
        }
    peerConnection3.onconnectionstatechange =
        function(event) {
            console.log('caca handleconnectionstatechange');
            console.log(event);
        }
    peerConnection3.oniceconnectionstatechange = function(event) {
        console.log('caca ice connection state: ' + event.target.iceConnectionState);
    }
    dataChannel = peerConnection3.createDataChannel('chat');
    dataChannel.onopen = datachannelopen;
    dataChannel.onmessage = datachannelmessage;
    createOfferPromise = peerConnection3.createOffer();
    createOfferPromise.then(
        function(offer) {
            console.log('caca createOfferDone');
            setLocalPromise = peerConnection3.setLocalDescription(offer);
            setLocalPromise.then(
                function() {
                    console.log('caca setLocalDone')
                },
                function (reason) {
                    console.log('caca setLocalFailed');
                    console.log(reason);
                });
        },
        function(reason) {
            console.log('caca createOfferFailed');
            console.log(reason);
        });
}

function createOfferDone(offer) {
  console.log('createOfferDone');
  setLocalPromise = peerConnection.setLocalDescription(offer);
  setLocalPromise.then(setLocalDone, setLocalFailed);
}

function createOfferFailed(reason) {
  console.log('createOfferFailed');
  console.log(reason);
}

function setLocalDone() {
  console.log('setLocalDone');
}

function setLocalFailed(reason) {
  console.log('setLocalFailed');
  console.log(reason);
}

function lasticecandidate() {
  console.log('lasticecandidate');
  textelement = document.getElementById('textoffer');
  offer = peerConnection.localDescription;
  textelement.value = JSON.stringify(offer);
  document.getElementById('buttonoffersent').disabled = false;
}

function clickoffersent() {
  console.log('clickoffersent');
  document.getElementById('spananswer').classList.toggle('invisible');
  document.getElementById('buttonoffersent').disabled = true;
}

function clickanswerpasted() {
  console.log('clickanswerpasted');
  document.getElementById('buttonanswerpasted').disabled = true;
  textelement = document.getElementById('textanswer');
  textelement.readOnly = true;
  answer = JSON.parse(textelement.value);
  setRemotePromise = peerConnection.setRemoteDescription(answer);
  setRemotePromise.then(setRemoteDone, setRemoteFailed);
}

function setRemoteDone() {
  console.log('setRemoteDone');
}

function setRemoteFailed(reason) {
  console.log('setRemoteFailed');
  console.log(reason);
}

