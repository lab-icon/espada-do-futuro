let inputValue;

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

	if (address == '/sensor/1') {
		inputValue = value[0];  
	}
	if (address == '/sensor/2') {
		inputValue = value[0];  
	}
	if (address == '/sensor/3') {
		inputValue = value[0];  
	}
	if (address == '/sensor/4') {
		inputValue = value[0];  
	}
	if (address == '/sensor/5') {
		inputValue = value[0];  
	}
	if (address == '/sensor/6') {
		inputValue = value[0];  
	}
	if (address == '/sensor/7') {
		inputValue = value[0];  
	}
	if (address == '/sensor/8') {
		inputValue = value[0];  
	}
	if (address == '/sensor/9') {
		inputValue = value[0];  
	}
	if (address == '/sensor/10') {
		inputValue = value[0];  
	}
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
