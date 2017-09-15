const mongoose = require('mongoose');
const ioClient = require('socket.io')(8080);
const ioServer = require('socket.io')(8002);
const User = require('./models/user');
const Address = require('./models/address');

// //Connect to DB
// mongoose.connect('mongodb://@ds125994.mlab.com:25994/whoshere');

var options = {
	db: { native_parser: true },
	user: 'admin',
	pass: '1234'
}
mongoose.connect('mongodb://ds125994.mlab.com:25994/whoshere', options, function() {
	console.log('connected to database !');
});

// Users 
let getUsers = function() {
	User.find({}, function (err, users) {
		if (!err) {
			console.log('noerror', users);
			return users;
		} else {
			return null;
		}
	});
}

let newUser = function(address, firstName, lastName, located) {
	let _newUser = new User(address, firstName, lastName, located);
	_newUser.save(function (err) {
		if (err) return null;
		// saved!
	})
	return null;
}

let updateUser = function(id, address, firstName, lastName, located) {
	User.findById(id, function (err, user) {
		if (err) return null;
		
		user.size = address;
		user.firstName = firstName;
		user.lastName = lastName;
		user.located = located;

		user.save(function (err, updateUser) {
			if (err) {
				return null;
			}
			return null;
		});
	});
}

//Addresses 
let setAddresses = function(addresses) {
	//Delete all existing addresses.
	console.log('setAddresses');
	Address.remove({}, () => {
		//Add new addresses for each.
		console.log('here1111');
		addresses.map(address => {
			console.log('address', address);
			let _newAddress = new Address({address: address});
			console.log('_newAddress', _newAddress);
			_newAddress.save(function (err, newAddress) {
				console.log('saved-before', newAddress, err);
				if (err) return null;
				console.log('saved', newAddress);
				// saved!
			})
			return null;
		});
	});

	//Update Client
	ioClient.sockets.emit('update', addresses);
}

let getAddresses = function() {
	let addresses = [];
	Address.find({}, (err, addresses) => {
		if (!err) {
			console.log('noerror', addresses);
			addresses = addresses;
			return addresses;
		} else {
			return null;
		}
	});
	return addresses;
}

ioClient.on('connection', function (socket) {
	// socket connected
	console.log('Connection established to Client');

	let users = getUsers();
	socket.emit('connected', { users: users});

	socket.on('update', function (data) {
		console.log('Client Update', data);
		uUser = updateUser(data.id, data.address, data.firstName, data.lastName, data.located);	
	});

	socket.on('create', function(data) {
		newUser(data.address, data.firstName, data.lastName, data.located);
	});
});



ioServer.on('connection', function (socket) {
	// socket connected
	console.log('Connect established to Local Server');
	socket.on('update', function(addresses) {
		console.log(addresses.macList);
		setAddresses(addresses.macList);
	});
});
