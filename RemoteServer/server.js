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



let verifyToken = (token, next) => {
    //Decode token
    jwt.verify(token, 'this_is_a_test_secret_do_not_use_for_the_love_of_god' , function(err, decoded) {
        if (err) {
        	console.log(err);
            next(null);
        } else {
            // if everything is good, save to request for use in other routes
            next(decoded);
        }
    });
};


var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Hey! Welcome to my API' });
});

router.post('/auth/login', function(req, res) {

    console.log('logging in');
	try {
        let address = req.body.address;
        let password = req.body.password;

        User.findOne({address: address, password: password},
            function(err, user) {
                if (err) return null;

                if (user !== null) {
                    //Generate Token
                    let token = jwt.sign({data: user}, 'this_is_a_test_secret_do_not_use_for_the_love_of_god', {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        message: 'Login Successful',
                        token: token
                    });
                } else {
                    res.sendStatus(401);
                    // res.json({
                    //     message: 'Login Unsuccessful',
                    // });
                }
            });

	} catch(e) {
		console.log('Error: ', e);
		res.json({ message: e });
	}
});

router.post('/auth/create', function(req, res) {
	try {
		let firstName = req.body.firstName;
		let lastName = req.body.lastName;
		let password = req.body.password;
		let address = req.body.address;

		console.log(req.body);

		User.findOneAndUpdate({address: address}, {firstName: firstName, lastName: lastName, password: password, address: address, online: true}, {upsert: true},
			function(err, user) {
                if (err) return null;

                console.log("new user " + firstName + " " + lastName + " " + password + " " + address);
                //Generate Token
                let token = jwt.sign({data: user}, 'this_is_a_test_secret_do_not_use_for_the_love_of_god', {
                    expiresIn: 1440 // expires in 24 hours
                });

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

router.get('/addresses/getAll', function(req, res) {

    verifyToken(req.headers.token, function(decoded) {

    	req.decoded = decoded;
    	if (decoded === null) {
			return res.sendStatus(401);
		}

        try {
            Address.find({}, function (err, addresses){
                if (addresses !== null) {
                    res.json({
                        message: 'List of Addresses',
                        addresses: addresses,
                    });
                } else {
                    res.json({
                        message: 'No addresses in db',
                        users: null,
                    });
                }
            });

        } catch(e) {
            console.log('Error: ', e);
            res.json({ message: e});
        }
	});
});

router.put('/addresses/link', function(req, res) {
	verifyToken(req.headers.token, function(decoded) {
        req.decoded = decoded;
        if (decoded === null) {
            return res.sendStatus(401);
        }

        console.log('adddress', req.body.address, decoded);
        try {
            Address.findOne({address: req.body.address}, function (err, address){
                if (address !== null) {
                	console.log('adddress', address, decoded);
                	if (!address.linked) {

                		address.linked = true;
						address.save(function(err, updatedAddress) {

                            User.findById(decoded.data._id, function(err, user) {
                                if (err) return null;
                                if (user !== null) {
                                	let oldAddress = user.address;
                                    user.address = req.body.address;
                                    user.save(function(err, updatedUser) {
										console.log('updatedUser', updatedUser);

                                        //Get existing linked address and unlink it if not equal the address were setting

                                        Address.findOne({address: oldAddress}, function (err, address) {
                                            if (err) return null;
                                            if (address !== null) {
                                            	if (address.address !== req.body.address) {
                                                    address.linked = false;
                                                }
                                                address.save(function(err, newAddress) {
                                                    res.json({
                                                        message: 'Linked successfully',
                                                        success: true,
                                                    });

                                                });
                                            } else {
                                                res.json({
                                                    message: 'Linked successfully',
                                                    success: true,
                                                });
											}
                                        });
                                    });
                                } else {
                                    res.json({
                                        message: 'Token does not link to a user',
                                        success: false,
                                    });
								}
                            });
                        });

					} else if (address.address === req.body.address) {
                        res.json({
                            message: 'Address already linked',
                            success: true,
                        });
					} else {
                        res.json({
                            message: 'Address already taken',
                            success: false,
                        });
					}
                } else {
                    res.json({
                        message: 'Address doesnt exist',
                        success: false,
                    });
				}
            });

        } catch(e) {
            console.log('Error: ', e);
            res.json({ message: e});
        }
	});
});

router.get('/users/list', function(req, res) {
    verifyToken(req.headers.token, function(decoded) {
    	if (decoded === null) {
            return res.sendStatus(401);
		}

    	User.find({}, function (err, users){
    		if (err) return null;
            res.json({
                message: 'Heres all the users!',
                users: users,
            });
        });
	});
});

router.get('/users/online', function (req, res) {
    verifyToken(req.headers.token, function(decoded) {
        if (decoded === null) {
            return res.sendStatus(401);
        }

        User.find({online: true}, function (err, users){
            if (err) return null;

            res.json({
                message: 'Heres all the online users!',
                users: users,
            });
        });

    });
});

router.get('/users/me', function(req, res) {
    verifyToken(req.headers.token, function(decoded) {
        if (decoded === null) {
            return res.sendStatus(401);
        }

        res.json({
            address: decoded.data.address,
            firstName: decoded.data.firstName,
            lastName: decoded.data.lastName
        });
        console.log(decoded);
    });
});

ioClient.on('connection', function (socket) {
	// socket connected
	console.log('Connection established to Client');
});

ioServer.on('connection', function (socket) {
	// socket connected
	console.log('Connect established to Local Server');
	socket.on('update', function(addresses) {
		Address.setAddresses(addresses.macList);
		User.toggleOnline(addresses.macList);
	});
});

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use('/', router);
app.listen(8082);
