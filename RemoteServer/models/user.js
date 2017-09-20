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
    let newUser = new UserSchema({address: address, firstName: firstName, lastName: lastName, password: password})
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


module.exports = mongoose.model('User', UserSchema);  