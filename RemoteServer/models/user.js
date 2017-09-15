const mongoose = require('mongoose'),  
Schema = mongoose.Schema;

const UserSchema = new Schema({  
	id: {
		type: Schema.Types.ObjectId,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	located: {
		type: Boolean
	}
},
{
	timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
}
);

module.exports = mongoose.model('User', UserSchema);  