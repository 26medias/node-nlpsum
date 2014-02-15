var _ 					= require('underscore');
var nodecrypto 			= require('crypto');


function crypto() {
	
}

// List file by extention in any subdirectory
crypto.prototype.md5 = function(data) {
	var md5sum = nodecrypto.createHash('md5');
	md5sum.update(data);
	return md5sum.digest('hex');
}

exports.main = new crypto();