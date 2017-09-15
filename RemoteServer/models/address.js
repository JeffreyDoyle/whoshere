const mongoose = require('mongoose'),  
Schema = mongoose.Schema;

const AddressSchema = new Schema({  
	address: {
		type: String,
		required: true
	}
},
{
	timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
}
);

module.exports = mongoose.model('Address', AddressSchema);  