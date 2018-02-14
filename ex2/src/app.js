const openStream = require('./openStream');
const $ = require('jquery');
const playVideo = require('./playVideo');

const uid = require('uid');
const Peer = require('peerjs');

const io = require('socket.io-client');

const socket  = io('127.0.0.1:8081');
const getIceObject = require('./getIceObject');

// getIceObject(iceConfig =>{
	const connectionObj = {
		host: 'seanpeer.herokuapp.com',
		port: '443',
		secure: true,
		key: 'peerjs',
		// config: iceConfig
	};
	const peerId = getPeer();
	socket.emit('NEW_PEER_ID', peerId);
	const peer = Peer(peerId, connectionObj);
	// console.log('111');
	// console.log(peer);
	$('#ulPeerId').on('click', 'li', function (){
		const peerId = $(this).text();
		console.log(peerId);
		openStream(stream => {
			playVideo(stream, 'localstream');
			const call = peer.call(peerId, stream);
			console.log(call);
			call.on('stream', remoteStream => playVideo(remoteStream, 'friendstream'));
		})
	});
	peer.on('call', call => {
		// console.log('111');
		openStream(stream => {
			playVideo(stream, 'localstream');
			call.answer(stream);
			call.on('stream', remoteStream => playVideo(remoteStream, 'friendstream'));
		});
	});
// })

function getPeer(){
	const id = uid(10);
	$('#peer-id').append(id);
	return id;
}

socket.on('ONLINE_PEER', arrPeerId =>{
	// console.log(arrPeerId);
	arrPeerId.forEach( id => {
		$('#ulPeerId').append('<li id='+id+'>'+id+'</li>');
	})

});

socket.on('SOME_ONE_DISCONNECT', peerid => {
	$('#'+peerid).remove();
});

socket.on('NEW_CLIENT_CONNECT', id => $('#ulPeerId').append('<li id='+id+'>'+id+'</li>'));


