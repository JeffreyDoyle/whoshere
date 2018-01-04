const mongoose = require('mongoose'),  
Schema = mongoose.Schema;

const UserSchema = new Schema({  
	address: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
    },
    password: {
        type: String,
    },
    online: {
	    type: Boolean,
    }
});


UserSchema.statics.getUsers = function() {
    return this.find({}, function (err, users) {
        if (!err) {
            console.log('noerror', users);
            return users;
        } else {
            return null;
        }
    });
};


UserSchema.statics.newUser = function(address, firstName, lastName, password) {
    let newUser = new UserSchema({address: address, firstName: firstName, lastName: lastName, password: password, online: true});
    newUser.save(function(err, user) {
        console.log('newUser');
    });
};


UserSchema.statics.updateUser = function(id, address, firstName, lastName, located) {
    this.findById(id, function (err, user) {
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
};

UserSchema.statics.toggleOnline = function(addresses) {

    let context = this;

    console.log('toggle online', addresses);

    this.find({}, function (err, users) {
        if (!err) {

            users.map((user) => {
                if (addresses.includes(user.address)) {
                    context.findOneAndUpdate({address: user.address}, {online: true}, {upsert: true},
                        function(err, user) {
                            if (err) return null;

                        });
                } else {
                    context.findOneAndUpdate({address: user.address}, {online: false}, {upsert: true},
                        function(err, user) {
                            if (err) return null;

                        });
                }
            });

            return users;
        } else {
            return null;
        }
    });
};


module.exports = mongoose.model('User', UserSchema);  