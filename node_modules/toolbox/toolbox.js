exports.file 		= require('./file.js').main;
exports.stack 		= require('./stack.js').main;
exports.crypto 		= require('./crypto.js').main;
exports.mongo 		= require('./mongo.js').main;
exports.uuid 		= require('./uuid.js');

exports.Arbiter 	= new (require('./Arbiter.js').main)();


// Settings
exports.settings	= {};

exports.log			= function(label, value) {
	console.log("\033[35m ["+label+"]:\033[37m",JSON.stringify(value,null,4))
};

// Metas
exports.version		= "1.5.2";