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

AddressSchema.statics.getAddresses = function() {
    let addresses = [];
    this.find({}, (err, addresses) => {
        if (!err) {
            addresses = addresses;
            return addresses;
        } else {
            return null;
        }
    });
    return addresses;
};

AddressSchema.statics.setAdresses = function(addresses) {
    //Delete all existing addresses.
    this.remove({}, () => {
        //Add new addresses for each.
        addresses.map(address => {
            let _newAddress = new Address({address: address});
            _newAddress.save(function (err, newAddress) {
                if (err) return null;
                // saved!
            });
            return null;
        });
    });
}


module.exports = mongoose.model('Address', AddressSchema);  