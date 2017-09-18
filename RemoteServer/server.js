const mongoose = require('mongoose');
const ioClient = require('socket.io')(8080);
const ioServer = require('socket.io')(8002);
const User = require('./models/user');
const Address = require('./models/address');


var express    = require('express');        // call express
var app        = express();     
var bodyParser = require('body-parser');            // define our app using express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.set('superSecret', 'this_is_a_test_secret_do_not_use_for_the_love_of_god');

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


var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Hey! Welcome to my API' });
});

router.post('/auth/login', function(req, res) {

	try {
        let address = req.body.address;
        let password = req.body.password;

        res.json({ message: 'Post Succes', address: address, password: password });

	} catch(e) {
		console.log('Error: ', e);
		res.json({ message: e });
	}
});

router.post('/auth/create', function(req, res) {
	try {
		let firstName = req.body.firstName;
		let lastName = req.body.lastName;
		let address = req.body.address;
		let password = req.body.password;

		User.findOneAndUpdate({address: address}, {address: address, firstName: firstName, lastName: lastName, password: password}, {upsert: true},
			function(err, user) {
                if (err) return null;

                //Generate Token
                console.log('making token');
                let token = jwt.sign({data: user}, 'this_is_a_test_secret_do_not_use_for_the_love_of_god', {
                    expiresIn: 1440 // expires in 24 hours
                });
                console.log('token made');

                // return the information including token as JSON
                res.json({
                    message: 'New User Created',
                    token: token
                });
            });
		
	} catch(e) {
		console.log('Error: ', e);
		res.json({ message: e });
	}
});



ioClient.on('connection', function (socket) {
	// socket connected
	console.log('Connection established to Client');
});

ioServer.on('connection', function (socket) {
	// socket connected
	console.log('Connect established to Local Server');
	socket.on('update', function(addresses) {
		// Address.setAddresses(addresses.macList);
	});
});

app.use('/', router);
app.listen(8082);
