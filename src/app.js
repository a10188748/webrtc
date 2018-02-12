const openStream = require('./openStream');
const $ = require('jquery');
const Peer = require('simple-peer');
const playVideo = require('./playVideo');

openStream(function (stream){
	playVideo(stream,'localstream');
	const p = new Peer({initiator: location.hash === '#1', trickle: false, stream: stream});
	p.on('signal', token => {
		$('#txtMySignal').val(JSON.stringify(token));
	});
	$('#btnConnect').click(() => {
		const friendSignal = JSON.parse($('#txtFSignal').val());
		p.signal(friendSignal);
	});
	p.on('stream', friendStream => playVideo(friendStream, 'friendstream'))
});

