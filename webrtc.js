let trans_configuration = {iceServers: []};

// DISABLE BECAUSE WITHOUT 3º SERVER ITS MORE COOL IN LAN
//~ let trans_configuration = {
        //~ iceServers: [{
            //~ urls: "stun:stun.stunprotocol.org"}]};

let trans_peerConection = null;
let trans_trans_createOfferPromise = null;

function starthandsake() {
    try {
        trans_peerConection = new RTCPeerConnection(trans_configuration);
        trans_peerConection.onicecandidate =
            function(event) {
                if (event.candidate == null) {
                    let offer = trans_peerConection.localDescription;
                    document.getElementById('trans_handshake').append(JSON.stringify(offer));
                }
            };
        trans_peerConection.onconnectionstatechange =
            function(event) {
            };
        trans_peerConection.oniceconnectionstatechange = function(event) {
        }
        dataChannel = trans_peerConection.createDataChannel('chat');
        //~ dataChannel.onopen = function() {}
        //~ dataChannel.onmessage = function() {}
        trans_createOfferPromise = trans_peerConection.createOffer();
        trans_createOfferPromise.then(
            function(offer) {
                setLocalPromise = trans_peerConection.setLocalDescription(offer);
                setLocalPromise.then(
                    function() {
                    },
                    function (reason) {
                        throw reason;
                    });
            },
            function(reason) {
                throw reason;
            });

    }
    catch(err) {
        document.getElementById('trans_handshake').append(err);
    }
}