const io = require('socket.io')(8080);

const arrPeerId = [];

io.on('connect', socket => {
	console.log('新連線進入');
	
	socket.emit('ONLINE_PEER', arrPeerId);

	socket.on('NEW_PEER_ID', peerId => {
		socket.peerId = peerId;
		arrPeerId.push(peerId);
		io.emit('NEW_CLIENT_CONNECT', peerId);
		// console.log('peerid = '+peerId);
		// console.log(arrPeerId);
	})
	socket.on('disconnect', ()=> {
		const index = arrPeerId.indexOf(socket.peerId);
		arrPeerId.splice(index, 1);
		io.emit('SOME_ONE_DISCONNECT', socket.peerId);
	})
});