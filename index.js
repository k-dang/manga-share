var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connectionCounter = 0;

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	connectionCounter += 1;
	console.log(`${connectionCounter} total users connected `);

	socket.on('disconnect', function(){
		connectionCounter -= 1;
	});

	socket.on('url change', function(msg){
		socket.broadcast.emit('url change', msg);
	})

	socket.on('chapter change', function(msg){
		socket.broadcast.emit('chapter change', msg);
	})

	socket.on('page change', function(msg){
		socket.broadcast.emit('page change', msg);
	})

	socket.on('page update', function(msg){
		socket.broadcast.emit('page update', msg);
	});

	socket.on('chapter update', function(msg){
		socket.broadcast.emit('chapter update', msg);
	})
});

http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
})