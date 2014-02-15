var _ 					= require('underscore');
var mongodb 			= require('mongodb');

function mongo(options) {
	this.options = _.extend({
		host:		"127.0.0.1",
		port:		27017,
		database:	"gamify"
	},options);
	
	this.collections = {};
}
mongo.prototype.init = function(callback) {
	var scope 		= this;
	
	this.server 	= new mongodb.Server(this.options.host, this.options.port, {});
	this.db			= new mongodb.Db(this.options.database, this.server, {w:1});
	this.db.open(function (error, client) {
		if (error) {
			throw error;
		}
		scope.instance = client;
		callback();
	});
}
mongo.prototype.open = function(collectionName, callback) {
	var scope 		= this;
	if (!this.collections[collectionName]) {
		this.collections[collectionName] = new mongodb.Collection(this.instance, collectionName);
	}
	callback(this.collections[collectionName]);
}
mongo.prototype.remove = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{}
	},options);
	
	this.open(options.collection, function(collection) {
		
		collection.remove(options.query, function(err, removed) {
			callback(removed);
		});
		
		
	});
};
mongo.prototype.aggregate = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		match:			false,
		unwind:			false,
		group:			false,
		project:		false,
		rules:			[]
	},options);
	
	this.open(options.collection, function(collection) {
		if (options.rules.length > 0) {
			// New structure
			
			collection.aggregate(options.rules, function(err, response) {
				console.log("\n\n------------------------------------------------------------------["+options.collection+"]\n", JSON.stringify(options.rules, null, 4));
				
				callback(response);
			});
		} else {
			// Deprecated, compatibility mode with old code
			collection.aggregate(_.compact([options.project,options.match,options.unwind,options.group]), function(err, response) {
				callback(response);
			});
		}
	});
};
mongo.prototype.distinct = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		key:			"uuid",
		query:			{}
	},options);
	
	this.open(options.collection, function(collection) {
		collection.distinct(options.key, options.query, function(err, response) {
			callback(response);
		});
		
	});
};
mongo.prototype.count = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		options:		{}
	},options);
	
	this.open(options.collection, function(collection) {
		
		collection = collection.find(options.query,{},options.options);
		
		collection.count(function(err, count) {
			callback(count);
		});
		
		
	});
};
mongo.prototype.paginationInfo = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		perpage:		10,
		page:			1
	},options);
	
	this.open(options.collection, function(collection) {
		
		collection = collection.find(options.query,options.fields,options.options);
		
		collection.count(function(err, count) {
			var np	= Math.ceil(count/options.perpage);
			
			callback({
				perpage:	options.perpage,
				total:		count,
				pages:		np
			});
		});
		
		
	});
};
mongo.prototype.paginate = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		perpage:		10,
		page:			1
	},options);
	
	this.paginationInfo(options, function(response) {
		response.current	= options.page;
		scope.find(options, function(response2) {
			callback({
				pagination:	response,
				data:		response2
			});
		});
	});
};

mongo.prototype.find = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		fields:			{},
		options:		{},
		page:			false,
		perpage:		10,
		limit:			false,
		skip:			false,
		sort:			false
	},options);
	
	this.open(options.collection, function(collection) {
		
		collection = collection.find(options.query,options.fields,options.options);
		
		if (options.page) {
			options.limit 	= options.perpage*1;
			options.skip	= options.perpage*options.page-options.perpage;
		}
		
		if (options.limit) {
			collection = collection.limit(options.limit);
		}
		if (options.skip) {
			collection = collection.skip(options.skip);
		}
		
		if (options.sort) {
			collection = collection.sort(options.sort);
		}
		collection.toArray(function(err, docs) {
			callback(docs, err);
		});
	});
}
mongo.prototype.insert = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		data:			{},
		options:		{}
	},options);
	console.log("options",options);
	this.open(options.collection, function(collection) {
		collection.insert(options.data,options.options, callback);
	});
}
mongo.prototype.update = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		data:			{},
		options:		{
			multi:	true,
			upsert:	true
		}
	},options);
	
	this.open(options.collection, function(collection) {
		collection.update(options.query,options.data,options.options, callback);
	});
}
mongo.prototype.addToSet = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		path:			"",
		data:			{},
		options:		{}
	},options);
	
	var _update 	= {
		$addToSet:	{}
	};
	_update['$addToSet'][options.path] = options.data;
	
	this.open(options.collection, function(collection) {
		collection.update(options.query,_update,options.options, callback);
	});
}
mongo.prototype.pull = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		path:			"",
		data:			{},
		options:		{}
	},options);
	
	
	var _update 	= {
		$pull:	{}
	};
	_update[$pull][options.path] = options.data;
	
	
	this.open(options.collection, function(collection) {
		collection.update(options.query,_update,options.options, callback);
	});
}
mongo.prototype.updateSub = function(options, callback) {
	var scope 		= this;
	
	options			= _.extend({
		collection:		"",
		query:			{},
		path:			"",
		data:			{},
		options:		{}
	},options);
	
	var i;
	var _query 		= {};
	var _update 	= {};
	
	_query[options.path] = {
		$elemMatch:	data
	}
	
	_update[$set] = {};
	for (i in data) {
		_update[$set][options.path+".$."+i]	= data[i];
	}
	
	this.open(options.collection, function(collection) {
		collection.update(_query,_update,options.options, callback);
	});
}

exports.main = mongo;